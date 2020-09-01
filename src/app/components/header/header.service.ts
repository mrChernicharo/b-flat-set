import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class HeaderService {
  screenWidth: number;
  screenHeight: number;
  openMenu: boolean = false;
  public sideMenuOpen = new BehaviorSubject<boolean>(this.openMenu);
  mobileSize: boolean = false;
  public isMobile = new BehaviorSubject<boolean>(this.mobileSize);

  constructor() {
    this.getScreenSize();
  }

  toggleSideMenu() {
    this.sideMenuOpen.next(!this.openMenu);
    this.openMenu = !this.openMenu;
  }

  getScreenSize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    this.mobileSize = this.screenWidth <= 628 ? true : false;
  }
}
