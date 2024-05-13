import { Component } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  template: `
  <shared-header></shared-header>
  <router-outlet></router-outlet>
  <shared-footer></shared-footer>
  `
})
export class MainLayoutComponent {

}
