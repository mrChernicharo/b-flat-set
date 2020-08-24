import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class HeaderService {
  openMenu: boolean = false;
  public sideMenuOpen = new BehaviorSubject<boolean>(this.openMenu);
  mobileSize: boolean = false;
  public isMobile = new BehaviorSubject<boolean>(this.mobileSize);
  screenWidth: number;
  screenHeight: number;

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
