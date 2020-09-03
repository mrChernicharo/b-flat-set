import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { SetsService } from './sets.service';
import { Setlist } from './setlist.model';

@Component({
  selector: 'app-sets',
  templateUrl: './sets.component.html',
  styleUrls: ['./sets.component.scss']
})
export class SetsComponent implements OnInit {
  screenWidth: number;
  screenHeight: number;
  sets: Setlist[] = [];
  @Input() cols: number = 2;

  constructor(private setsService: SetsService, private router: Router) {
  }

  ngOnInit(): void {
    this.sets = this.setsService.setlists
    this.screenWidth = window.innerWidth
    this.screenWidth >= 1200 ? this.cols = 2 : this.cols = 1;
    this.setsService.fetchSets().subscribe(data => {
      // const setKeys = Object.keys(data)
      // console.log(setKeys)
      // const mapped = data.forEach((item, i) => data[setKeys[i]])
      // console.log(mapped)
    })
  }

  @HostListener('window:resize', ['$event']) getScreenResize(event?) {

    this.screenWidth = event.target.innerWidth
    this.screenWidth >= 1200 ? this.cols = 2 : this.cols = 1;

  }

  gotoSet() {
    this.router.navigate(['/sets/new'])
  }

}
