import { Injectable, OnInit } from '@angular/core';
import { Song } from '../songs/song.model';
import { Setlist } from './setlist.model';
import { SongsService } from '../songs/songs.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SetsService implements OnInit {
  songbook: Song[] = [];
  setlists: Setlist[] = [];


  constructor(
    private songsService: SongsService, private http: HttpClient, private authService: AuthService
  ) { }

  ngOnInit() {
  }

  createSet(setlist: Setlist) {
    this.setlists.push(setlist)
    console.log(this.setlists);
  }


  fetchSets(): Observable<Setlist[]> {
    return this.http.get<Setlist[]>(
      `${this.songsService.url}setlists${this.songsService.userId}.json`)
    // .pipe(tap(responseData => { console.log(responseData) }))  
  }


  persistSetlist(setlist: Setlist): Promise<Setlist> {
    return this.http.post<Setlist>(
      `${this.songsService.url}setlists${this.songsService.userId}.json`, setlist, { responseType: 'json', observe: 'body' })
      .pipe(tap(data => { console.log(data) })).toPromise()
  }

}

//songbook${this._userId}.json`, song, { responseType: 'json', observe: 'body' }).pipe(tap(song => {
//   this.newSongAdded.next(song)
// }))