import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="menu">
      <a routerLink="/">Home</a>
      <a routerLink="board">Board</a>
      <a routerLink="sandbox">Sandbox</a>
    </div>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
}
