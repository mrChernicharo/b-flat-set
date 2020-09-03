import { Injectable } from '@angular/core';
import { Song } from '../songs/song.model';
import { Setlist } from './setlist.model';
import { SongsService } from '../songs/songs.service';

@Injectable({
  providedIn: 'root'
})
export class SetsService {
  songbook: Song[] = [];
  sets: Setlist[] = [];
  // {
  //   name: 'Samba',
  //   songs: [
  //     { composer: "Tom Jobim", key: "D", name: "Wave", style: "Bossa Nova", tempo: 86 },
  //     { composer: "João Donato", key: "Dm", name: "A Rã", style: "Bossa Nova", tempo: 100 },
  //     { composer: "Carlos Lyra", key: "C", name: "Influência do Jazz", style: "Bossa Jazz", tempo: 110 },
  //     { composer: "Tom Jobim", key: "D", name: "Wave", style: "Bossa Nova", tempo: 86 },
  //     { composer: "João Donato", key: "Dm", name: "A Rã", style: "Bossa Nova", tempo: 100 },
  //     { composer: "Carlos Lyra", key: "C", name: "Influência do Jazz", style: "Bossa Jazz", tempo: 110 }
  //   ]
  // },
  // {
  //   name: 'Jazz',
  //   songs: [
  //     {
  //       composer: "Pat Metheny", key: "D", name: "Bright Size Life", style: "Jazz Fusion", tempo: 110
  //     }
  //   ]
  // },
  // {
  //   name: 'Forró',
  //   songs: [
  //     { composer: "Luiz Gonzaga", key: "G", name: "Baião", style: "Baião", tempo: 100 }
  //   ]
  // }

  constructor(
    private songsService: SongsService
  ) { }


  createSet(setlist: Setlist) {
    this.sets.push(setlist)
    console.log(this.sets)
  }
}
