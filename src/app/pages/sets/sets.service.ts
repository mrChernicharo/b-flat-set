import { Injectable, OnInit } from '@angular/core';
import { Song } from '../songs/song.model';
import { Setlist } from './setlist.model';
import { SongsService } from '../songs/songs.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface ResponseData {
  [key: string]: Setlist[]
}

@Injectable({
  providedIn: 'root'
})
export class SetsService {
  songbook: Song[] = [];
  setlists: Setlist[] = [];
  userId: string = null;

  constructor(
    private songsService: SongsService, private http: HttpClient, private authService: AuthService
  ) {
    this.authService.user.subscribe(userData => {
      this.userId = userData.id
    })
  }


  createSet(setlist: Setlist) {
    this.setlists.push(setlist)
    console.log(this.setlists);
  }


  fetchSets(): Observable<Setlist[]> {
    return this.http.get<ResponseData[]>(
      `${this.songsService.url}setlists${this.userId}.json`)
      .pipe(
        map(responseData => {
          const setKeys = Object.keys(responseData)
          const finalSets: Setlist[] = []
          for (let [i, j] of setKeys.entries()) {
            // console.log(i)
            // console.log(j)
            // console.log(responseData[j])
            let newSet = new Setlist(responseData[j].setlistName, responseData[j].songs)
            finalSets.push(newSet)
          }
          console.log(finalSets)
          this.setlists = finalSets
          return finalSets;
        }),

      )
  }


  persistSetlist(setlist: Setlist): Promise<Setlist> {
    return this.http.post<Setlist>(
      `${this.songsService.url}setlists${this.userId}.json`, setlist, { responseType: 'json', observe: 'body' })
      .pipe(tap(data => { console.log(data) })).toPromise()
  }

}

//songbook${this._userId}.json`, song, { responseType: 'json', observe: 'body' }).pipe(tap(song => {
//   this.newSongAdded.next(song)
// }))