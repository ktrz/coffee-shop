import {Component, Input, OnInit} from '@angular/core';
import {CoffeeRequestStatus} from '../../../coffee-request';

@Component({
  selector: 'app-coffee-item',
  template: `
    <div [ngSwitch]="item.status" class="status-icon">
      <i *ngSwitchCase="'requested'" class="fa fa-check-circle-o"></i>
      <i *ngSwitchCase="'making'" class="fa fa-spinner fa-spin"></i>
      <i *ngSwitchCase="'done'" class="fa fa-coffee"></i>
      <i *ngSwitchCase="'pickedUp'" class="fa fa-check-circle"></i>
    </div>
    <div [class]="'item-container ' + item.status">
      <div>Order id: {{item.id}}</div>
      <div>Order status: {{item.status}}</div>
    </div>
  `,
  styleUrls: ['./coffee-item.component.scss']
})
export class CoffeeItemComponent implements OnInit {

  @Input() item: CoffeeRequestStatus;

  constructor() {
  }

  ngOnInit() {
  }

}
