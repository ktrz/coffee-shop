import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RequestOnlyComponent} from './request-only.component';
import {MatButtonModule} from '@angular/material';
import {CoffeeItemsModule} from '../../shared/coffee-items/coffee-items.module';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    CoffeeItemsModule,
  ],
  declarations: [
    RequestOnlyComponent,
  ],
  exports: [RequestOnlyComponent]
})
export class RequestOnlyModule {
}
