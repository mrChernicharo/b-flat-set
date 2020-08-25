import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SongsService } from '../songs.service';
import { Song } from '../song.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-song-add',
  templateUrl: './song-add.component.html',
  styleUrls: ['./song-add.component.scss']
})
export class SongAddComponent {
  song: Song = {
    name: 'o Ovo',
    composer: 'Hermeto Pascoal',
    style: 'Baião Jazz',
    key: 'G',
    tempo: 96
  }
  keys = ['A', 'Am', 'Ab', 'Abm', 'G', 'Gm', 'Gb', 'F#m', 'F', 'Fm', 'E', 'Em', 'Eb', 'Ebm', 'D', 'Dm', 'Db', 'C#m', 'C', 'Cm', 'B', 'Bm', 'Bb', 'Bbm']
  initialKey = this.keys[8]

  constructor(
    private songsService: SongsService,
    private router: Router) { }

  createSong() { }

  cancel() {
    this.router.navigate(['/songs'])
  }

  onSubmit() {
    alert('Thanks!');
  }
}
