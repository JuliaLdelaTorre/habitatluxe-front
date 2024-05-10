import { Component } from '@angular/core';

@Component({
  selector: 'shared-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isMenuOpen: boolean = false;

// hace que el menu se abra y cierre
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  isMobile() {
    return window.innerWidth <= 768;
  }
}
