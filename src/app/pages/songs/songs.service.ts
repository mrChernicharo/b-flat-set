import { Injectable, OnInit } from "@angular/core";
import { Song } from "./song.model";
import { Observable, of, Subject, BehaviorSubject, ReplaySubject } from "rxjs";
import { map, tap, take } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "../auth/auth.service";

@Injectable({ providedIn: "root" })
export class SongsService {
  public newSongAdded = new Subject<Song>();
  public songsUpdated = new ReplaySubject<Song[]>();
  public songbook: Song[] = [];
  // public url: string = 'http://localhost:3001/songs';
  private _url: string = "https://bflatset.firebaseio.com/";
  private _userId: string;
  constructor(private http: HttpClient, private authService: AuthService) {
    this.getSongsFromAPI();
    console.log("ói nóis aqui!");
  }

  get url() {
    return this._url;
  }

  get userId() {
    return this._userId;
  }

  public getCachedSongs(): Song[] {
    const cachedData = localStorage.getItem("songbook");
    if (cachedData) {
      return JSON.parse(cachedData);
    }
  }

  public getSongsFromAPI(): Observable<Song[]> {
    this.authService.user.pipe(take(1)).subscribe((userData) => {
      this._userId = userData.id;
    });
    if (this._userId) {
      console.log("catando songs do backend");
      return this.http
        .get<Song[]>(`${this._url}songbook${this._userId}.json`)
        .pipe(
          map((data) => {
            if (data) {
              const songsData = data;
              const keys = Object.keys(data);
              const finalData: Song[] = [];
              for (let k of keys) {
                let song: Song = songsData[k];
                // console.log(song)
                finalData.push(song);
              }
              this.songbook = finalData;
              this.songsUpdated.next(finalData);
              console.log(this.songbook);
              localStorage.setItem("songbook", JSON.stringify(finalData));
              return finalData;
            } else {
              return [];
            }
          })
        );
    }
  }

  public getSongById(id: string): Song {
    return this.songbook.find((song) => song.id === id);
  }

  public getSongByName(songName: string): Song {
    return this.songbook.find((song) => song.name === songName);
  }

  public addSong(song: Song): Observable<Song> {
    return this.http
      .post<Song>(`${this._url}songbook${this._userId}.json`, song, {
        responseType: "json",
        observe: "body",
      })
      .pipe(
        tap((song) => {
          this.newSongAdded.next(song);
        })
      );
  }
}
