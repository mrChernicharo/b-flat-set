import { Component, OnInit, HostListener } from '@angular/core';
import { HeaderService } from '../header/header.service';
import { AuthService } from 'src/app/pages/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  opened: boolean;
  currentPage: string = 'dashboard';
  isMobile: boolean;
  isAuthenticated: boolean = false;

  constructor(
    private headerService: HeaderService,
    private authService: AuthService,
    private router: Router
  ) {
    this.headerService.getScreenSize();
  }

  ngOnInit(): void {
    console.log(`Authenticated -> ${this.isAuthenticated}`)

    this.headerService.sideMenuOpen.subscribe(bool => {
      // console.log(bool);
      this.opened = bool;
    });
    this.headerService.isMobile.subscribe(bool => {
      this.isMobile = bool;
    })
    this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user
      console.log(`Authenticated -> ${this.isAuthenticated}`)
    })
  }

  @HostListener('window:resize', ['$event'])
  getScreen(event?) {
    this.headerService.getScreenSize()
  }


  mobileClose() {
    console.log('clicou')
    this.headerService.toggleSideMenu()
    // this.opened = false;
    // this.headerService.sideMenuOpen.next(false);
  }

  logoff() {
    this.isAuthenticated = !this.isAuthenticated;
    this.authService.logout()
    // this.router.navigate(['/auth']);
  }

}


// setInterval(()=> {
//  this.opened = !this.opened;
// }, 1000);
