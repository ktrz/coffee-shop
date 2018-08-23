import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Example1Component} from './example1.component';
import {MatButtonModule} from '@angular/material';
import {CoffeeItemsModule} from '../../shared/coffee-items/coffee-items.module';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    CoffeeItemsModule,
  ],
  declarations: [
    Example1Component,
  ],
  exports: [Example1Component]
})
export class Example1Module {
}
