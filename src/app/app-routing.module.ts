import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Example1Component} from './examples/example1/example1.component';
import {Example1Module} from './examples/example1/example1.module';
import {SandboxComponent} from './examples/sandbox/sandbox.component';
import {SandboxModule} from './examples/sandbox/sandbox.module';

const routes: Routes = [{
  path: 'board',
  component: Example1Component,
}, {
  path: 'sandbox',
  component: SandboxComponent,
}];

@NgModule({
  imports: [RouterModule.forRoot(routes), Example1Module, SandboxModule],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
