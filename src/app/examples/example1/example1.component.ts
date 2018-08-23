import {Component} from '@angular/core';
import {merge, Observable, of, OperatorFunction, Subject, zip} from 'rxjs';
import {delay, map, mergeMap, scan, share, startWith, tap} from 'rxjs/operators';
import {
  setStatus,
  CoffeeRequest,
  CoffeeRequestStatus,
  CoffeeRequestStatusValue,
  createCoffeeRequest,
  generateId
} from '../../coffee-request';


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

  coffeeMaking$ = this.coffeeReqs$.pipe(
    assignBarista(this.barista$)
  );

  coffeeDone$ = this.coffeeMaking$.pipe(
    mergeMap(c => this.makeCoffee(c))
  );

  coffeePickedUp$ = this.coffeeDone$.pipe(
    mergeMap(c => this.pickupCoffee(c))
  );

  statuses$ = merge(
    this.coffeeReqs$.pipe(setStatus(CoffeeRequestStatusValue.requested)),
    this.coffeeMaking$.pipe(setStatus(CoffeeRequestStatusValue.making)),
    this.coffeeDone$.pipe(setStatus(CoffeeRequestStatusValue.done)),
    this.coffeePickedUp$.pipe(setStatus(CoffeeRequestStatusValue.pickedUp)),
  );

  state$: Observable<any[]> = this.statuses$.pipe(
    scan((state: { [key: number]: CoffeeRequestStatus }, val: CoffeeRequestStatus) => ({
        ...state,
        [val.id]: val,
      }),
      {}),
    map(state => Object.keys(state)
      .map(key => state[key])
      .filter(v => !!v)),
    startWith([])
  );

  assignBarista(request) {
    return of(request).pipe(delay(1500));
  }

  makeCoffee(request) {
    return of(request).pipe(delay(1500));
  }

  pickupCoffee(request) {
    return of(request).pipe(delay(1000));
  }
}
