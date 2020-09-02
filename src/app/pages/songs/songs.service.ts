import { Injectable, OnInit } from '@angular/core';
import { Song } from './song.model';
import { Observable, of, Subject, BehaviorSubject, ReplaySubject } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class SongsService {
  public newSongAdded = new Subject<Song>()
  public songsUpdated = new ReplaySubject<Song[]>()
  public songbook: Song[] = [];
  // public url: string = 'http://localhost:3001/songs';
  private url: string = 'https://bflatset.firebaseio.com/';
  public userId: string;
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {

  }

  public getSongs(): Observable<Song[]> {
    this.authService.user.pipe(take(1))
      .subscribe(userData => {
        this.userId = userData.id
      })
    if (this.userId) {
      return this.http.get<Song[]>(`${this.url}songbook${this.userId}.json`).pipe(map(data => {
        if (data) {
          const songsData = data;
          const keys = Object.keys(data)
          const finalData: Song[] = []
          for (let k of keys) {
            let song: Song = songsData[k]
            // console.log(song)
            finalData.push(song)
          }
          this.songbook = finalData
          this.songsUpdated.next(finalData);
          console.log(this.songbook)
          return finalData;
        }
        else {
          return [];
        }
      }));
    }
  }

  public getSongById(id: string): Song {
    return this.songbook.find(song => song.id === id);
  }

  public addSong(song: Song): Observable<Song> {
    return this.http.post<Song>(`${this.url}songbook${this.userId}.json`, song, { responseType: 'json', observe: 'body' }).pipe(tap(song => {
      this.newSongAdded.next(song)
    }))

  }


}
