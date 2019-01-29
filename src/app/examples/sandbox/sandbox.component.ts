import {Component} from '@angular/core';
import {merge, of, Subject} from 'rxjs';
import {CoffeeRequestStatusValue, createCoffeeRequest, generateId, setStatus} from '../../coffee-request';
import {delay, map, mergeMap, scan, share, tap} from 'rxjs/operators';


const assignBarista = r => of(r).pipe(delay(1000));
const makeCoffee = r => of(r).pipe(delay(2000));
const pickUp = r => of(r).pipe(delay(500));

@Component({
  selector: 'app-sandbox',
  template: `
    <div>
      <button mat-raised-button (click)="click$.next()">Add order</button>
      <app-coffee-items [items]="statuses$ | async"></app-coffee-items>
    </div>
  `,
  styleUrls: ['./sandbox.component.scss']
})
export class SandboxComponent {
  public click$ = new Subject();

  coffeeRequest$ = this.click$.pipe(
    map(generateId()),
    map(createCoffeeRequest),
    tap((r) => console.log(r)),
    share()
  );

  coffeeMaking$ = this.coffeeRequest$.pipe(
    mergeMap(r => assignBarista(r))
  );

  coffeeDone$ = this.coffeeRequest$.pipe(
    mergeMap(r => makeCoffee(r))
  );

  pickedUp$ = this.coffeeDone$.pipe(
    mergeMap(r => pickUp(r))
  );

  statuses$ = merge(
    this.coffeeRequest$.pipe(setStatus(CoffeeRequestStatusValue.requested)),
    this.coffeeMaking$.pipe(setStatus(CoffeeRequestStatusValue.making)),
    this.coffeeDone$.pipe(setStatus(CoffeeRequestStatusValue.done)),
    this.pickedUp$.pipe(setStatus(CoffeeRequestStatusValue.pickedUp)),
  )
    .pipe(
      scan((acc, curr: any) => ({
        ...acc,
        [curr.id]: curr,
      }), {}),
      map(m => Object.keys(m)
        .map(key => m[key])
        .filter(v => !!v)
      ));
}
