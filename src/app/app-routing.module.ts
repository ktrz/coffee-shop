import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Example1Component} from './examples/example1/example1.component';
import {Example1Module} from './examples/example1/example1.module';
import {SandboxComponent} from './examples/sandbox/sandbox.component';
import {SandboxModule} from './examples/sandbox/sandbox.module';
import {RequestOnlyComponent} from './examples/1-request/request-only.component';
import {RequestOnlyModule} from './examples/1-request/request-only.module';
import {AssignBaristaModule} from './examples/2-assign-barista/assign-barista.module';
import {AssignBaristaComponent} from './examples/2-assign-barista/assign-barista.component';
import {AssignBaristaReducedStateComponent} from './examples/3-assign-barista-reduced-state/assign-barista-reduced-state.component';
import {AssignBaristaReducedStateModule} from './examples/3-assign-barista-reduced-state/assign-barista-reduced-state.module';
import {CoffeeMadeAndPickedComponent} from './examples/4-coffee-made-picked/coffee-made-and-picked.component';
import {CoffeeMadeAndPickedModule} from './examples/4-coffee-made-picked/coffee-made-and-picked.module';
import {BaristaAvailableComponent} from './examples/5-barista-available/barista-available.component';
import {BaristaAvailableModule} from './examples/5-barista-available/barista-available.module';

const routes: Routes = [{
  path: 'board',
  component: Example1Component,
}, {
  path: 'sandbox',
  component: SandboxComponent,
}, {
  path: '1-request',
  component: RequestOnlyComponent,
}, {
  path: '2-barista',
  component: AssignBaristaComponent,
}, {
  path: '3-barista',
  component: AssignBaristaReducedStateComponent,
}, {
  path: '4-made-picked',
  component: CoffeeMadeAndPickedComponent,
}, {
  path: '5-barista-available',
  component: BaristaAvailableComponent,
}];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    Example1Module,
    SandboxModule,
    RequestOnlyModule,
    AssignBaristaModule,
    AssignBaristaReducedStateModule,
    CoffeeMadeAndPickedModule,
    BaristaAvailableModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
