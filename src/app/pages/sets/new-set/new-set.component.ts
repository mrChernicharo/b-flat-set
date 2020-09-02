import { Component, OnInit, OnChanges } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { SongsService } from '../../songs/songs.service';
import { Song } from '../../songs/song.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-set',
  templateUrl: './new-set.component.html',
  styleUrls: ['./new-set.component.scss'],
})
export class NewSetComponent implements OnInit, OnChanges {
  songbook: string[] = [];

  set = []

  todo = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];

  done = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];

  constructor(private sonsService: SongsService, private router: Router) { }

  ngOnInit() {
    this.sonsService.getSongs().subscribe(data => {
      console.log(data)
      this.songbook = data.map(d => d.name)
    })
  }

  ngOnChanges() {
    console.log(this.set)
    console.log(this.songbook)
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log(event.container.data); console.log(event.previousIndex); console.log(event.currentIndex)


    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      this.set = event.container.data
      console.log(event.previousContainer.data); console.log(event.container.data); console.log(event.previousIndex); console.log(event.currentIndex);

    }
  }
  saveSet() {
    // this.set = event.container.data
    console.log(this.set)
  }

  goBack() {
    this.router.navigate(['/sets'])
  }
}
