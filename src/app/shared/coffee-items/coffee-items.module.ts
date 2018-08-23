import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoffeeItemModule} from '../coffee-item/coffee-item.module';
import {CoffeeItemsComponent} from './coffee-items.component';

@NgModule({
  imports: [
    CommonModule,
    CoffeeItemModule,
  ],
  declarations: [CoffeeItemsComponent],
  exports: [CoffeeItemsComponent],
})
export class CoffeeItemsModule {
}
