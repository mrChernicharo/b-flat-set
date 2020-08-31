import { Injectable } from '@angular/core';
import { Song } from './song.model';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class SongsService {
  private songs: Song[] = [];
  // public url: string = 'http://localhost:3001/songs';
  private url: string = 'https://bflatset.firebaseio.com/';
  private user: string = 'admin'
  constructor(
    private http: HttpClient
  ) {

  }

  public getSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(`${this.url}${this.user}.json`).pipe(map(data => {
      const songsData = data;
      const keys = Object.keys(data)
      const finalData: Song[] = []
      for (let k of keys) {
        let song: Song = songsData[k]
        console.log(song)
        finalData.push(song)
      }
      return finalData
    }));

  }

  public addSong(song: Song): Observable<Song> {

    return this.http.post<Song>(`${this.url}${this.user}.json`, song, { responseType: 'json', observe: 'body' })

  }


}
