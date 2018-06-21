import {Component} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {delay, map, mergeMap, scan, share, startWith} from 'rxjs/operators';
import {addStatus, CoffeeRequest, createCoffeeRequest, generateId} from '../../coffee-request';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {merge} from 'rxjs/observable/merge';

@Component({
  selector: 'app-sandbox',
  template: `
    <div>
      <button (click)="clicks$.next($event)">Add order</button>
      <app-coffee-items [items]="state$ | async"></app-coffee-items>
    </div>
  `,
  styleUrls: ['./sandbox.component.scss']
})
export class SandboxComponent {
  clicks$: Subject<any> = new Subject();

  coffeeRequests$ = this.clicks$
    .pipe(
      map(generateId()),
      map(createCoffeeRequest),
      share()
    );
  coffeeMaking$ = this.coffeeRequests$.pipe(
    mergeMap(r => this.assignBarista(r))
  );
  coffeeDone$ = this.coffeeRequests$.pipe(
    mergeMap(r => this.makeCoffee(r))
  );
  coffeePickedUp$ = this.coffeeDone$.pipe(
    mergeMap(r => this.pickupCoffee(r))
  );

  state$ = merge(
    this.coffeeRequests$.pipe(addStatus('requested')),
    this.coffeeMaking$.pipe(addStatus('making')),
    this.coffeeDone$.pipe(addStatus('done')),
    this.coffeePickedUp$.pipe(addStatus('pickedUp')),
  )
    .pipe(
      scan((state: any, v: any) => ({
        ...state,
        [v.id]: v
      }), {}),
      startWith({}),
      map(state => Object.keys(state).map(key => state[key]))
    );

  assignBarista(r: CoffeeRequest): Observable<CoffeeRequest> {
    return of(r).pipe(delay(r.id % 3 * 1000));
  }

  makeCoffee(r: CoffeeRequest): Observable<CoffeeRequest> {
    return of(r).pipe(delay(1500));
  }

  pickupCoffee(r: CoffeeRequest): Observable<CoffeeRequest> {
    return of(r).pipe(delay(750));
  }
}
