import { Injectable } from '@angular/core';
import { Song } from '../songs/song.model';
import { SongsService } from '../songs/songs.service';

@Injectable({
  providedIn: 'root'
})
export class SetsService {
  songbook: Song[] = [];

  constructor(
    private songsService: SongsService
  ) { }

  loadSongs() {
    this.songsService.songsUpdated.subscribe(data => {
      this.songbook = data;
      console.log('songbook')
      console.log(this.songbook)
    })
  }
}
