import {Component} from '@angular/core';
import {merge, Observable, of, OperatorFunction, Subject, zip} from 'rxjs';
import {CoffeeRequest, CoffeeRequestStatusValue, createCoffeeRequest, idGenerator, setStatus} from '../../coffee-request';
import {delay, map, mapTo, scan, share, startWith, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-sandbox',
  template: `
    <h1>Sandbox</h1>
    <button mat-raised-button (click)="clicks$.next()">Add order</button>
    <button mat-raised-button (click)="baristaCheckIn$.next()">Barista check in</button>
    <div>Baristas available: {{baristasAvailable$ | async}}</div>
    <app-coffee-items [items]="state$ | async"></app-coffee-items>
  `,
  styleUrls: ['./sandbox.component.scss']
})
export class SandboxComponent {
  clicks$: Subject<void> = new Subject();
  baristaCheckIn$: Subject<void> = new Subject();
  barista$ = of(null).pipe(switchMap(() => merge(this.baristaCheckIn$, this.coffeeDone$)));
  // After presentation I was suggested with the following solution instead of using `of` and `switchMap`
  // `defer` can be imported from 'rxjs'
  // barista$ = defer(() => merge(this.baristaCheckIn$, this.coffeeDone$));
  coffeeReqs$: Observable<CoffeeRequest> = this.clicks$.pipe(
    map(idGenerator()),
    map(createCoffeeRequest),
    share()
  );
  coffeeMaking$: Observable<CoffeeRequest> = this.coffeeReqs$.pipe(this.assignBarista());
  coffeeDone$: Observable<CoffeeRequest> = this.coffeeMaking$.pipe(this.makeCoffee());
  coffeePickedUp$: Observable<CoffeeRequest> = this.coffeeDone$.pipe(this.pickupCoffee());
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

  baristasAvailable$ = merge(
    this.barista$.pipe(mapTo(1)),
    this.coffeeMaking$.pipe(mapTo(-1))
  ).pipe(
    scan((baristas, change) => baristas + change, 0),
    startWith(0),
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
