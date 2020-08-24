import { Component, OnInit, HostListener } from '@angular/core';
import { HeaderService } from '../header/header.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  opened: boolean;
  currentPage: string = 'dashboard';
  isMobile: boolean;

  constructor(
    private headerService: HeaderService
  ) {
    this.headerService.getScreenSize();
  }

  ngOnInit(): void {
    this.headerService.sideMenuOpen.subscribe(bool => {
      console.log(bool);
      this.opened = bool;
    });
    this.headerService.isMobile.subscribe(bool => {
      this.isMobile = bool;
    })
  }

  @HostListener('window:resize', ['$event'])
  getScreen (event?) {
    this.headerService.getScreenSize()
  }
  

  mobileClose() {
    console.log('clicou')
    this.headerService.toggleSideMenu()
    // this.opened = false;
    // this.headerService.sideMenuOpen.next(false);
  }

}


// setInterval(()=> {
//  this.opened = !this.opened;
// }, 1000);
