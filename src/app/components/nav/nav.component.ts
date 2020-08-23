import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../header/header.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  opened: boolean;
  currentPage: string = 'dashboard';


  constructor(
    private headerService: HeaderService
  ) { }

  ngOnInit(): void {
    this.headerService.sideMenuOpen.subscribe(bool => {
      console.log(bool);
      this.opened = bool;
    })
  }



}


// setInterval(()=> {
//  this.opened = !this.opened;
// }, 1000);
