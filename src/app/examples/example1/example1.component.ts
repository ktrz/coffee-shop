import {Component} from '@angular/core';
import {merge, Observable, of, OperatorFunction, Subject} from 'rxjs';
import {delay, map, mergeMap, scan, share, startWith, tap} from 'rxjs/operators';
import {CoffeeRequest, CoffeeRequestStatusValue, createCoffeeRequest, idGenerator, setStatus} from '../../coffee-request';

@Component({
  selector: 'app-example1',
  template: `
    <div>
      <button mat-raised-button (click)="clicks$.next($event)">Add order</button>
      <app-coffee-items [items]="state$ | async"></app-coffee-items>
    </div>
  `,
  styleUrls: ['./example1.component.scss']
})
export class Example1Component {
  clicks$: Subject<Event> = new Subject();
  barista$: Subject<Event> = new Subject();

  coffeeReqs$: Observable<CoffeeRequest> = this.clicks$.pipe(
    map(idGenerator()),
    map(createCoffeeRequest),
    share()
  );

  coffeeMaking$: Observable<CoffeeRequest> = this.coffeeReqs$.pipe(this.assignBarista());

  coffeeDone$: Observable<CoffeeRequest> = this.coffeeMaking$.pipe(this.makeCoffee());

  coffeePickedUp$: Observable<CoffeeRequest> = this.coffeeDone$.pipe(this.pickupCoffee());

  statuses$ = merge(
    this.coffeeReqs$,
    this.coffeeMaking$,
    this.coffeeDone$,
    this.coffeePickedUp$,
  ).pipe(
    tap(console.log.bind(console, 'status change:'))
  );

  state$: Observable<CoffeeRequest[]> =
    this.statuses$.pipe(
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
      delay(5000),
      setStatus(CoffeeRequestStatusValue.making)
    );
    // return input => {
    //   const assigned$ = zip(input, this.barista$).pipe(
    //     map(([i]) => i),
    //     setStatus(CoffeeRequestStatusValue.assigned)
    //   );
    //   const making$ = assigned$.pipe(
    //     delay(500),
    //     setStatus(CoffeeRequestStatusValue.making)
    //   );
    //
    //   return merge(assigned$, making$);
    // };
  }

  makeCoffee(): OperatorFunction<CoffeeRequest, CoffeeRequest> {
    return (source: Observable<CoffeeRequest>) => source.pipe(
      mergeMap(request => of(request)),
      delay(5000),
      setStatus(CoffeeRequestStatusValue.done)
    );
    // return (source: Observable<CoffeeRequest>) => source.pipe(
    //   allowStatuses(CoffeeRequestStatusValue.making),
    //   tap(console.log.bind(console, 'source:')),
    //   mergeMap(request => of(request).pipe(
    //     delay(1500),
    //     setStatus(CoffeeRequestStatusValue.done)
    //   ))
    // );
  }

  pickupCoffee(): OperatorFunction<CoffeeRequest, CoffeeRequest> {
    return (source: Observable<CoffeeRequest>) => source.pipe(
      mergeMap(request => of(request)),
      delay(5000),
      setStatus(CoffeeRequestStatusValue.pickedUp)
    );
  }
}
