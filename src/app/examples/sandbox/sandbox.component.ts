import {Component} from '@angular/core';
import {merge, Observable, OperatorFunction, Subject} from 'rxjs';
import {CoffeeRequest, CoffeeRequestStatusValue, createCoffeeRequest, idGenerator, setStatus} from '../../coffee-request';
import {delay, map, scan, share, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-sandbox',
  template: `
    <h1>Sandbox</h1>
    <button mat-raised-button (click)="clicks$.next()">Add order</button>
    <app-coffee-items [items]="state$ | async"></app-coffee-items>
  `,
  styleUrls: ['./sandbox.component.scss']
})
export class SandboxComponent {
  clicks$: Subject<void> = new Subject();
  coffeeReqs$: Observable<CoffeeRequest> = this.clicks$.pipe(
    map(idGenerator()),
    map(createCoffeeRequest),
    share()
  );
  coffeeMaking$: Observable<CoffeeRequest> = this.coffeeReqs$.pipe(this.assignBarista());
  coffeeDone$: Observable<CoffeeRequest> = this.coffeeMaking$.pipe(this.makeCoffee());
  coffeePickedUp$: Observable<CoffeeRequest> = this.coffeeDone$.pipe(this.pickupCoffee());
  state$: Observable<CoffeeRequest[]> =
    merge(this.coffeeReqs$, this.coffeeMaking$, this.coffeeDone$, this.coffeePickedUp$).pipe(
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
      delay(1000),
      setStatus(CoffeeRequestStatusValue.making)
    );
  }

  makeCoffee(): OperatorFunction<CoffeeRequest, CoffeeRequest> {
    return (source: Observable<CoffeeRequest>) => source.pipe(
      delay(2000),
      setStatus(CoffeeRequestStatusValue.done)
    );
  }

  pickupCoffee(): OperatorFunction<CoffeeRequest, CoffeeRequest> {
    return (source: Observable<CoffeeRequest>) => source.pipe(
      delay(800),
      setStatus(CoffeeRequestStatusValue.pickedUp)
    );
  }
}
