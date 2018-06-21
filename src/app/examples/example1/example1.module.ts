import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Example1Component} from './example1.component';
import {CoffeeItemComponent} from './coffee-item/coffee-item.component';
import {CoffeeItemsComponent} from './coffee-items/coffee-items.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [Example1Component, CoffeeItemComponent, CoffeeItemsComponent],
  exports: [Example1Component]
})
export class Example1Module {
}
