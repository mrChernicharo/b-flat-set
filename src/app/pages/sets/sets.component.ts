import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { SetsService } from './sets.service';

@Component({
  selector: 'app-sets',
  templateUrl: './sets.component.html',
  styleUrls: ['./sets.component.scss']
})
export class SetsComponent implements OnInit {
  screenWidth: number;
  screenHeight: number;
  sets = [];
  // sets = [1, 2, 3, 4, 5];
  @Input() cols: number = 2;

  constructor(private setsService: SetsService, private router: Router) {
  }

  ngOnInit(): void {
    this.sets = this.setsService.sets
    this.screenWidth = window.innerWidth
    this.screenWidth >= 1200 ? this.cols = 2 : this.cols = 1;
  }

  @HostListener('window:resize', ['$event']) getScreenResize(event?) {
    // console.log(event.target.innerHeight)
    // console.log(event.target.innerWidth)
    this.screenWidth = event.target.innerWidth
    this.screenWidth >= 1200 ? this.cols = 2 : this.cols = 1;

  }

  gotoSet() {
    this.router.navigate(['/sets/new'])
  }

}
