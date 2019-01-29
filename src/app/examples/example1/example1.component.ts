import {Component} from '@angular/core';
import {merge, Observable, of, OperatorFunction, Subject, zip} from 'rxjs';
import {delay, map, mergeMap, scan, share, startWith, tap} from 'rxjs/operators';
import {CoffeeRequest, CoffeeRequestStatusValue, createCoffeeRequest, generateId, setStatus} from '../../coffee-request';

const assignBarista: (barista$: Observable<any>) => OperatorFunction<CoffeeRequest, CoffeeRequest> =
  barista$ => input => zip(input, barista$).pipe(map(([i]) => i));

@Component({
  selector: 'app-example1',
  template: `
    <div>
      <button mat-raised-button (click)="clicks$.next($event)">Add order</button>
      <button mat-raised-button (click)="barista$.next($event)">Barista available</button>
      <app-coffee-items [items]="state$ | async"></app-coffee-items>
    </div>
  `,
  styleUrls: ['./example1.component.scss']
})
export class Example1Component {
  clicks$: Subject<any> = new Subject();
  barista$: Subject<any> = new Subject();

  coffeeReqs$: Observable<CoffeeRequest> = this.clicks$.pipe(
    map(generateId()),
    map(createCoffeeRequest),
    tap(console.log),
    share()
  );

  coffeeMaking$: Observable<CoffeeRequest> = this.coffeeReqs$.pipe(this.assignBarista());

  coffeeDone$: Observable<CoffeeRequest> = this.coffeeMaking$.pipe(mergeMap(c => this.makeCoffee(c)));

  coffeePickedUp$: Observable<CoffeeRequest> = this.coffeeDone$.pipe(mergeMap(c => this.pickupCoffee(c)));

  statuses$ = merge(
    this.coffeeReqs$,
    this.coffeeMaking$,
    this.coffeeDone$,
    this.coffeePickedUp$,
  );

  state$: Observable<any[]> = this.statuses$.pipe(
    scan((state: { [key: number]: CoffeeRequest }, val: CoffeeRequest) => ({
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
    return input => zip(input, this.barista$).pipe(
      delay(500),
      map(([i]) => i),
      setStatus(CoffeeRequestStatusValue.making)
    );
  }

  makeCoffee(request) {
    return of(request).pipe(
      delay(1500),
      setStatus(CoffeeRequestStatusValue.done)
    );
  }

  pickupCoffee(request) {
    return of(request).pipe(
      delay(1000),
      setStatus(CoffeeRequestStatusValue.pickedUp)
    );
  }
}
