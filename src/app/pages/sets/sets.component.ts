import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-sets',
  templateUrl: './sets.component.html',
  styleUrls: ['./sets.component.scss']
})
export class SetsComponent implements OnInit {
  screenWidth: number;
  screenHeight: number;

  constructor() { }

  ngOnInit(): void {
  }
  @HostListener('window:load', ['$event'])
  getInitialScreen(event?) {
    // console.log(event.target.innerHeight)
    console.log(event.currentTarget.self.innerWidth)
    this.screenWidth = event.currentTarget.self.innerWidth;
  }
  @HostListener('window:resize', ['$event'])
  getScreenResize(event?) {
    // console.log(event.target.innerHeight)
    // console.log(event.target.innerWidth)
    this.screenWidth = event.target.innerWidth
  }

}
