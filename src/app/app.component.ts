import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="menu">
      <a routerLink="/1-request">Request</a>
      <a routerLink="/2-barista">Barista</a>
      <a routerLink="/3-barista">Barista fixed</a>
      <a routerLink="/4-made-picked">Coffee made and picked</a>
      <a routerLink="/5-barista-available">Barista available</a>
      <a routerLink="sandbox">Sandbox</a>
    </div>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
}
