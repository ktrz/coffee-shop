import {Component} from '@angular/core';
import {merge, Observable, of, OperatorFunction, Subject, zip} from 'rxjs';
import {delay, map, mapTo, scan, share, startWith, switchMap} from 'rxjs/operators';
import {CoffeeRequest, CoffeeRequestStatusValue, createCoffeeRequest, idGenerator, setStatus} from '../../coffee-request';

@Component({
  selector: 'app-barista-check-in',
  template: `
    <h1>Barista available</h1>
    <button mat-raised-button (click)="click$.next()">Add order</button>
    <button mat-raised-button (click)="baristaCheckIn$.next()">Barista check-in</button>
    <div>
      Baristas available: {{ baristasAvailable$ | async}}
    </div>
    <app-coffee-items [items]="state$ | async"></app-coffee-items>
  `,
  styleUrls: ['./barista-check-in.component.scss']
})
export class BaristaCheckInComponent {
  click$: Subject<void> = new Subject();
  baristaCheckIn$: Subject<void> = new Subject();
  barista$ = of(null).pipe(switchMap(() => merge(
    this.baristaCheckIn$.asObservable(),
    this.coffeeDone$
  )));
  coffeeReqs$: Observable<CoffeeRequest> = this.click$.pipe(
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

  baristasAvailable$ =
    merge(
      this.barista$.pipe(mapTo(1)),
      this.coffeeMaking$.pipe(mapTo(-1)),
    ).pipe(
      scan((acc, v) => acc + v, 0),
      startWith(0)
    );

  assignBarista(): OperatorFunction<CoffeeRequest, CoffeeRequest> {
    return (source: Observable<CoffeeRequest>) => zip(source, this.barista$).pipe(
      map(([s]) => s),
      setStatus(CoffeeRequestStatusValue.making),
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
