import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AssignBaristaComponent} from './assign-barista.component';
import {MatButtonModule} from '@angular/material';
import {CoffeeItemsModule} from '../../shared/coffee-items/coffee-items.module';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    CoffeeItemsModule,
  ],
  declarations: [
    AssignBaristaComponent,
  ],
  exports: [AssignBaristaComponent]
})
export class AssignBaristaModule {
}
