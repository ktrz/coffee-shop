import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {delay, map, mergeMap, scan, share, startWith, tap} from 'rxjs/operators';
import {Subject} from 'rxjs/Subject';
import {of} from 'rxjs/observable/of';
import {merge} from 'rxjs/observable/merge';
import {addStatus, CoffeeRequest, CoffeeRequestStatus, createCoffeeRequest, generateId} from '../../coffee-request';

@Component({
  selector: 'app-example1',
  template: `
    <div>
      <button (click)="clicks$.next($event)">Add order</button>
      <app-coffee-items [items]="state$ | async"></app-coffee-items>
    </div>
  `,
  styleUrls: ['./example1.component.scss']
})
export class Example1Component {
  clicks$: Subject<any> = new Subject();

  coffeeReqs$: Observable<CoffeeRequest> = this.clicks$.pipe(
    map(generateId()),
    map(createCoffeeRequest),
    tap(console.log),
    share()
  );

  coffeeMaking$ = this.coffeeReqs$.pipe(
    mergeMap(c => this.assignBarista(c)),
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

  assignBarista(request: CoffeeRequest) {
    return of(request).pipe(delay((request.id % 3 + 1) * 500));
  }

  makeCoffee(request) {
    return of(request).pipe(delay(1500));
  }

  pickupCoffee(request) {
    return of(request).pipe(delay(1000));
  }
}
