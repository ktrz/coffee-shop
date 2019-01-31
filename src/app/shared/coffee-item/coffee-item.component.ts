import {Component, Input} from '@angular/core';
import {CoffeeRequest, CoffeeRequestStatusValue} from '../../coffee-request';

@Component({
  selector: 'app-coffee-item',
  template: `
    <mat-card [ngClass]="item.status">
      <mat-card-content class="order-content">
        <div class="item-container">
          <div>Order id: {{item.id}}</div>
          <div>Order status: {{item.status}}</div>
        </div>
        <div [ngSwitch]="item.status" class="status-icon">
          <i *ngSwitchCase="statusValues.requested" class="fa fa-check-circle-o"></i>
          <i *ngSwitchCase="statusValues.assigned" class="fa fa-check-circle"></i>
          <i *ngSwitchCase="statusValues.making" class="fa fa-spinner fa-spin"></i>
          <i *ngSwitchCase="statusValues.done" class="fa fa-coffee"></i>
          <i *ngSwitchCase="statusValues.pickedUp" class="fa fa-check-circle"></i>
        </div>
      </mat-card-content>
      <mat-card-footer>
        <mat-progress-bar mode="buffer" [value]="item.status | appStatusValue"></mat-progress-bar>
      </mat-card-footer>
    </mat-card>
  `,
  styleUrls: ['./coffee-item.component.scss']
})
export class CoffeeItemComponent {
  @Input() item: CoffeeRequest;
  statusValues = CoffeeRequestStatusValue;
}
