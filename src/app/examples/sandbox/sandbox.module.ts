import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SandboxComponent} from './sandbox.component';
import {CoffeeItemsComponent} from './coffee-items/coffee-items.component';
import {CoffeeItemComponent} from './coffee-item/coffee-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SandboxComponent,
    CoffeeItemsComponent,
    CoffeeItemComponent
  ],
  exports: [SandboxComponent],
})
export class SandboxModule {
}
