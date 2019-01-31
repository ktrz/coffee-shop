import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BaristaAvailableComponent} from './barista-available.component';
import {MatButtonModule} from '@angular/material';
import {CoffeeItemsModule} from '../../shared/coffee-items/coffee-items.module';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    CoffeeItemsModule,
  ],
  declarations: [
    BaristaAvailableComponent,
  ],
  exports: [BaristaAvailableComponent]
})
export class BaristaAvailableModule {
}
