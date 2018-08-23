import {NgModule} from '@angular/core';
import {CoffeeItemComponent} from './coffee-item.component';
import {CommonModule} from '@angular/common';
import {MatCardModule, MatProgressBarModule} from '@angular/material';
import {StatusValuePipe} from './status-value.pipe';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressBarModule,
  ],
  declarations: [CoffeeItemComponent, StatusValuePipe],
  exports: [CoffeeItemComponent],
})
export class CoffeeItemModule {
}
