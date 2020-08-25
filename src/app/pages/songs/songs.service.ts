import { Injectable } from '@angular/core';
import { Song } from './song.model';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class SongsService {
  songs: Song[];
  private url: string = 'http://localhost:3001/songs';
  constructor(
    private http: HttpClient
  ) {

  }

  public getSongs(): Observable<Song[]> {
    // public getSongs(): Song[] {
    const response = this.http.get<Song[]>(this.url).pipe(tap(data => {
      this.songs = data;
    }));
    return response;
  }

  public addSong(song: Song): void {
    this.songs.push(song)
  }


}