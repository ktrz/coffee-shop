import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoffeeMadeAndPickedComponent} from './coffee-made-and-picked.component';
import {MatButtonModule} from '@angular/material';
import {CoffeeItemsModule} from '../../shared/coffee-items/coffee-items.module';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    CoffeeItemsModule,
  ],
  declarations: [
    CoffeeMadeAndPickedComponent,
  ],
  exports: [CoffeeMadeAndPickedComponent]
})
export class CoffeeMadeAndPickedModule {
}
