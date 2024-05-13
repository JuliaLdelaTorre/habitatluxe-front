import { Component } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  template: `
  <shared-header></shared-header>
  <router-outlet></router-outlet>
  <shared-footer></shared-footer>
  `,
  styles: [`
  :host {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  router-outlet {
    flex-grow: 1;
  }
  `]
})
export class MainLayoutComponent {

}
