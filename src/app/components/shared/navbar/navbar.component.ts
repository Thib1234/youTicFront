import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private subMenuState: { [key: string]: boolean } = {};

  toggleSubMenu(menu: string): void {
    this.subMenuState[menu] = !this.subMenuState[menu];
  }

  isSubMenuOpen(menu: string): boolean {
    return this.subMenuState[menu];
  }
}
