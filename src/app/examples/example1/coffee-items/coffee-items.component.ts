import {Component, Input, OnInit} from '@angular/core';
import {CoffeeRequestStatus} from '../../../coffee-request';

@Component({
  selector: 'app-coffee-items',
  template: `
    <app-coffee-item *ngFor="let item of items" [item]="item"></app-coffee-item>
  `,
  styleUrls: ['./coffee-items.component.scss']
})
export class CoffeeItemsComponent implements OnInit {
  @Input() items: CoffeeRequestStatus[];

  constructor() {
  }

  ngOnInit() {
  }

}
