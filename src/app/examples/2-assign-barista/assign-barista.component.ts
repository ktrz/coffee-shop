import {Component} from '@angular/core';
import {Observable, of, OperatorFunction, Subject, merge} from 'rxjs';
import {delay, map, mergeMap, scan, share, startWith} from 'rxjs/operators';
import {CoffeeRequest, CoffeeRequestStatusValue, createCoffeeRequest, idGenerator, setStatus} from '../../coffee-request';

@Component({
  selector: 'app-assign-barista',
  template: `
    <div>
      <h1>Barista assigned</h1>
      <button mat-raised-button (click)="clicks$.next($event)">Add order</button>
      <app-coffee-items [items]="state$ | async"></app-coffee-items>
    </div>
  `,
  styleUrls: ['./assign-barista.component.scss']
})
export class AssignBaristaComponent {
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
        state: CoffeeRequest[],
        val: CoffeeRequest) => [...state, val],
        []),
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
