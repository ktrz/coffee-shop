import {Component} from '@angular/core';
import {Observable, of, OperatorFunction, Subject, merge} from 'rxjs';
import {delay, map, mergeMap, scan, share, startWith} from 'rxjs/operators';
import {CoffeeRequest, CoffeeRequestStatusValue, createCoffeeRequest, idGenerator, setStatus} from '../../coffee-request';

@Component({
  selector: 'app-assign-barista-reduced-state',
  template: `
    <div>
      <h1>Barista assigned - fixed state</h1>
      <button mat-raised-button (click)="clicks$.next($event)">Add order</button>
      <app-coffee-items [items]="state$ | async"></app-coffee-items>
    </div>
  `,
  styleUrls: ['./assign-barista-reduced-state.component.scss']
})
export class AssignBaristaReducedStateComponent {
  clicks$: Subject<Event> = new Subject();
  coffeeReqs$: Observable<CoffeeRequest> = this.clicks$.pipe(
    map(idGenerator()),
    map(createCoffeeRequest),
    share()
  );
  coffeeMaking$: Observable<CoffeeRequest> = this.coffeeReqs$.pipe(this.assignBarista());
  state$: Observable<CoffeeRequest[]> =
    merge(this.coffeeReqs$, this.coffeeMaking$).pipe(
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
    return (source: Observable<CoffeeRequest>) => source.pipe(
      mergeMap(request => of(request)),
      delay(1000),
      setStatus(CoffeeRequestStatusValue.making)
    );
  }
}
