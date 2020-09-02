import { Component, OnInit, Input, HostListener } from '@angular/core';

@Component({
  selector: 'app-sets',
  templateUrl: './sets.component.html',
  styleUrls: ['./sets.component.scss']
})
export class SetsComponent implements OnInit {
  screenWidth: number;
  screenHeight: number;
  sets = [
    {
      name: 'Samba',
      songs: [
        { composer: "Tom Jobim", key: "D", name: "Wave", style: "Bossa Nova", tempo: 86 },
        { composer: "João Donato", key: "Dm", name: "A Rã", style: "Bossa Nova", tempo: 100 },
        { composer: "Carlos Lyra", key: "C", name: "Influência do Jazz", style: "Bossa Jazz", tempo: 110 },
        { composer: "Tom Jobim", key: "D", name: "Wave", style: "Bossa Nova", tempo: 86 },
        { composer: "João Donato", key: "Dm", name: "A Rã", style: "Bossa Nova", tempo: 100 },
        { composer: "Carlos Lyra", key: "C", name: "Influência do Jazz", style: "Bossa Jazz", tempo: 110 }
      ]
    },
    {
      name: 'Jazz',
      songs: [
        {
          composer: "Pat Metheny", key: "D", name: "Bright Size Life", style: "Jazz Fusion", tempo: 110
        }
      ]
    },
    {
      name: 'Forró',
      songs: [
        { composer: "Luiz Gonzaga", key: "G", name: "Baião", style: "Baião", tempo: 100 }
      ]
    }
  ];
  // sets = [1, 2, 3, 4, 5];
  @Input() cols: number = 2;

  constructor() {
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth
    this.screenWidth >= 1200 ? this.cols = 2 : this.cols = 1;
  }

  @HostListener('window:resize', ['$event']) getScreenResize(event?) {
    // console.log(event.target.innerHeight)
    // console.log(event.target.innerWidth)
    this.screenWidth = event.target.innerWidth
    this.screenWidth >= 1200 ? this.cols = 2 : this.cols = 1;

  }

}
