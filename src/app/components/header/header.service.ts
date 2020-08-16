import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class HeaderService {
  openMenu: boolean = false;
  public sideMenuOpen = new BehaviorSubject<boolean>(this.openMenu);

  constructor() { }

  toggleSideMenu() {
    this.sideMenuOpen.next(!this.openMenu);
    this.openMenu = !this.openMenu;
  }
}
