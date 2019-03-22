import {Component} from '@angular/core';
import {defer, merge, Observable, OperatorFunction, Subject, zip} from 'rxjs';
import {CoffeeRequest, CoffeeRequestStatusValue, createCoffeeRequest, idGenerator, setStatus} from '../../coffee-request';
import {delay, map, mapTo, scan, share, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-sandbox',
  template: `
    <h1>Sandbox</h1>
    <button mat-raised-button (click)="clicks$.next()">Add order</button>
    <button mat-raised-button (click)="baristaAvailable$.next()">barista check-in</button>
    <div>Baristas: {{baristasCount$ | async}}</div>
    <app-coffee-items [items]="state$ | async"></app-coffee-items>
  `,
  styleUrls: ['./sandbox.component.scss']
})
export class SandboxComponent {
  clicks$: Subject<void> = new Subject();
  baristaAvailable$: Subject<void> = new Subject();
  barista$ = defer(() => merge(
    this.baristaAvailable$.asObservable(),
    this.coffeeDone$,
  ));
  coffeeReqs$: Observable<CoffeeRequest> = this.clicks$.pipe(
    map(idGenerator()),
    map(createCoffeeRequest),
    share()
  );
  coffeeMaking$: Observable<CoffeeRequest> = this.coffeeReqs$.pipe(this.assignBarista());
  coffeeDone$: Observable<CoffeeRequest> = this.coffeeMaking$.pipe(this.makeCoffee());
  coffeePickedUp$: Observable<CoffeeRequest> = this.coffeeDone$.pipe(this.pickupCoffee());
  baristasCount$ = merge(
    this.barista$.pipe(mapTo(1)),
    this.coffeeMaking$.pipe(mapTo(-1))
  ).pipe(
    scan((a, b) => a + b, 0),
    startWith(0)
  );
  state$: Observable<CoffeeRequest[]> =
    merge(this.coffeeReqs$, this.coffeeMaking$, this.coffeeDone$, this.coffeePickedUp$).pipe(
      scan((
        state: { [key: number]: CoffeeRequest },
        val: CoffeeRequest) => ({
          ...state,
          [val.id]: val,
        }),
        {}),
      map(state => Object.keys(state)
        .map(key => state[key])
        .filter(v => !!v)),
      startWith([])
    );

  assignBarista(): OperatorFunction<CoffeeRequest, CoffeeRequest> {
    return (source: Observable<CoffeeRequest>) => zip(source, this.barista$).pipe(
      map(([s]) => s),
      setStatus(CoffeeRequestStatusValue.making)
    );
  }

  makeCoffee(): OperatorFunction<CoffeeRequest, CoffeeRequest> {
    return (source: Observable<CoffeeRequest>) => source.pipe(
      delay(2000),
      setStatus(CoffeeRequestStatusValue.done)
    );
  }

  pickupCoffee(): OperatorFunction<CoffeeRequest, CoffeeRequest> {
    return (source: Observable<CoffeeRequest>) => source.pipe(
      delay(800),
      setStatus(CoffeeRequestStatusValue.pickedUp)
    );
  }
}
