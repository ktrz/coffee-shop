import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BaristaCheckInComponent} from './barista-check-in.component';
import {MatButtonModule} from '@angular/material';
import {CoffeeItemsModule} from '../../shared/coffee-items/coffee-items.module';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    CoffeeItemsModule,
  ],
  declarations: [
    BaristaCheckInComponent,
  ],
  exports: [BaristaCheckInComponent]
})
export class BaristaCheckInModule {
}
