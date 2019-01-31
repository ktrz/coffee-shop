import {Component} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {map, scan, share, startWith} from 'rxjs/operators';
import {CoffeeRequest, createCoffeeRequest, idGenerator} from '../../coffee-request';

@Component({
  selector: 'app-request-only',
  template: `
    <div>
      <h1>Request only</h1>
      <button mat-raised-button (click)="clicks$.next($event)">Add order</button>
      <app-coffee-items [items]="state$ | async"></app-coffee-items>
    </div>
  `,
  styleUrls: ['./request-only.component.scss']
})
export class RequestOnlyComponent {
  clicks$: Subject<Event> = new Subject();
  coffeeReqs$: Observable<CoffeeRequest> = this.clicks$.pipe(
    map(idGenerator()),
    map(createCoffeeRequest),
    share()
  );
  state$: Observable<CoffeeRequest[]> =
    this.coffeeReqs$.pipe(
      scan((
        state: CoffeeRequest[],
        val: CoffeeRequest) => [...state, val],
        []),
      startWith([])
    );
}
