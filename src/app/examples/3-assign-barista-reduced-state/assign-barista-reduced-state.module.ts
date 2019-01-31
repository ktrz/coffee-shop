import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AssignBaristaReducedStateComponent} from './assign-barista-reduced-state.component';
import {MatButtonModule} from '@angular/material';
import {CoffeeItemsModule} from '../../shared/coffee-items/coffee-items.module';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    CoffeeItemsModule,
  ],
  declarations: [
    AssignBaristaReducedStateComponent,
  ],
  exports: [AssignBaristaReducedStateComponent]
})
export class AssignBaristaReducedStateModule {
}
