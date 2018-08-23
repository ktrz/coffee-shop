import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SandboxComponent} from './sandbox.component';
import {CoffeeItemsModule} from '../../shared/coffee-items/coffee-items.module';
import {MatButtonModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    CoffeeItemsModule
  ],
  declarations: [
    SandboxComponent,
  ],
  exports: [SandboxComponent],
})
export class SandboxModule {
}
