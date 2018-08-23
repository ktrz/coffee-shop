// import {Component} from '@angular/core';
// import {Observable} from 'rxjs/Observable';
// import {delay, delayWhen, filter, map, mergeMap, scan, share, startWith, tap} from 'rxjs/operators';
// import {Subject} from 'rxjs/Subject';
// import {of} from 'rxjs/observable/of';
// import {merge} from 'rxjs/observable/merge';
// import {setStatus, CoffeeRequest, CoffeeRequestStatus, createCoffeeRequest, generateId} from '../../coffee-request';
// import {zip} from 'rxjs/observable/zip';
// import {BehaviorSubject} from 'rxjs/BehaviorSubject';
//
// @Component({
//   selector: 'app-example1',
//   template: `
//     <div>
//       <button (click)="clicks$.next($event)">Add order</button>
//       <!--<button (click)="baristaAvailableSubject$.next($event)">Barista available</button>-->
//       <app-coffee-items [items]="state$ | async"></app-coffee-items>
//     </div>
//   `,
//   styleUrls: ['./example1.component.scss']
// })
// export class Example1Component {
//   clicks$: Subject<any> = new Subject();
//   baristaAvailableSubject$: Subject<any> = new Subject();
//   baristaAvailable$: Observable<any> = this.baristaAvailableSubject$.pipe(
//     tap(() => console.log('barista clicked')),
//     filter(v => !!v),
//     map(generateId()),
//     tap(console.log),
//     share()
//   );
//   baristaNeededSubject$: Subject<number> = new BehaviorSubject(null);
//   baristaNeeded$ = this.baristaNeededSubject$.pipe(filter(v => !!v), share());
//   baristaAssignment$ = zip(
//     this.baristaAvailable$,
//     this.baristaNeeded$,
//   ).pipe(tap(zipped => console.log(zipped)), share());
//
//   // baristasAvailable$ = merge(
//   //   this.baristaAvailable$.pipe(mapTo('available'))
//   // ).pipe(
//   //   scan(([head, ...rest]: string[], b: any) => b === 'available'
//   //     ? [head, ...rest, b]
//   //     : [...rest],
//   //     [])
//   // );
//
//   coffeeReqs$: Observable<CoffeeRequest> = this.clicks$.pipe(
//     map(generateId()),
//     map(createCoffeeRequest),
//     tap(console.log),
//     share()
//   );
//
//   coffeeMaking$ = this.coffeeReqs$.pipe(
//     mergeMap(c => this.assignBarista(c)),
//     share()
//   );
//
//   coffeeDone$ = this.coffeeMaking$.pipe(
//     mergeMap(c => this.makeCoffee(c)),
//     share()
//   );
//
//   coffeePickedUp$ = this.coffeeDone$.pipe(
//     mergeMap(c => this.pickupCoffee(c)),
//     share()
//   );
//
//   statuses$ = merge(
//     this.coffeeReqs$.pipe(setStatus('requested')),
//     this.coffeeMaking$.pipe(setStatus('making')),
//     this.coffeeDone$.pipe(setStatus('done')),
//     this.coffeePickedUp$.pipe(setStatus('pickedUp')),
//   );
//
//   state$: Observable<any[]> = this.statuses$.pipe(
//     scan((state: { [key: number]: CoffeeRequestStatus }, val: CoffeeRequestStatus) => ({
//         ...state,
//         [val.id]: val,
//       }),
//       {}),
//     map(state => Object.keys(state)
//       .map(key => state[key])
//       .filter(v => !!v)),
//     startWith([])
//   );
//
//   constructor() {
//   }
//
//   assignBarista(request: CoffeeRequest) {
//     return of(request).pipe(delay((request.id % 5 + 1) * 500));
//     // return of(request).pipe(delayWhen(v => this.waitForBarista(v)));
//   }
//
//   waitForBarista(v: CoffeeRequest): Observable<any> {
//     const baristaAvailable$ = this.baristaAssignment$.pipe(
//       filter(([barista, orderId]) => orderId === v.id)
//     );
//     this.baristaNeededSubject$.next(v.id);
//     return baristaAvailable$;
//   }
//
//   makeCoffee(request) {
//     return of(request).pipe(delay(1500));
//   }
//
//   pickupCoffee(request) {
//     return of(request).pipe(delay(1000));
//   }
// }
