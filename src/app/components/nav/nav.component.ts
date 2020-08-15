import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  opened = false;


  constructor() { }

  ngOnInit(): void {
  }

}


// setInterval(()=> {
//  this.opened = !this.opened;
// }, 1000);
