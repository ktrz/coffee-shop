import {Component} from '@angular/core';
import {merge, Observable, of, OperatorFunction, Subject, zip} from 'rxjs';
import {delay, map, mergeMap, scan, share, startWith, tap} from 'rxjs/operators';
import {addStatus, CoffeeRequest, CoffeeRequestStatus, createCoffeeRequest, generateId} from '../../coffee-request';


const assignBaristaOperator: (barista$: Observable<any>) => OperatorFunction<CoffeeRequest, CoffeeRequest> =
  barista$ => input => zip(input, barista$).pipe(map(([i]) => i));

@Component({
  selector: 'app-example1',
  template: `
    <div>
      <button (click)="clicks$.next($event)">Add order</button>
      <button (click)="barista$.next($event)">Barista available</button>
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
    assignBaristaOperator(this.barista$),
    share()
  );

  coffeeDone$ = this.coffeeMaking$.pipe(
    mergeMap(c => this.makeCoffee(c)),
    share()
  );

  coffeePickedUp$ = this.coffeeDone$.pipe(
    mergeMap(c => this.pickupCoffee(c)),
    share()
  );

  statuses$ = merge(
    this.coffeeReqs$.pipe(addStatus('requested')),
    this.coffeeMaking$.pipe(addStatus('making')),
    this.coffeeDone$.pipe(addStatus('done')),
    this.coffeePickedUp$.pipe(addStatus('pickedUp')),
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

  makeCoffee(request) {
    return of(request).pipe(delay(1500));
  }

  pickupCoffee(request) {
    return of(request).pipe(delay(1000));
  }
}
