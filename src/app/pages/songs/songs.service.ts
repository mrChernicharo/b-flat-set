import { Injectable } from "@angular/core";
import { Song } from "./song.model";
import {
  Observable,
  Subject,
  BehaviorSubject,
  ReplaySubject,
  throwError,
} from "rxjs";
import { map, tap, catchError, first } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../auth/auth.service";

@Injectable({ providedIn: "root" })
export class SongsService {
  public newSongAdded = new Subject<Song>();
  // public userJustEntered = new BehaviorSubject<boolean>(true);
  public songsUpdated = new BehaviorSubject<Song[]>([]);
  public songbook: Song[] = [];
  private _url: string = "https://bflatset.firebaseio.com/";
  private _userId: string;
  public username: string;
  constructor(private http: HttpClient, private authService: AuthService) {
    // this.getSongsFromAPI();
    this.authService.user
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      )
      .subscribe((userData) => {
        this._userId = userData.id;
        this.username = userData.username;
      });
  }

  get url() {
    return this._url;
  }

  get userId() {
    return this._userId;
  }

  // public getCachedSongs(): Song[] {
  //   console.log("songsService: getCahedSongs()");

  //   const cachedData = localStorage.getItem("songbook");
  //   if (cachedData) {
  //     this.songbook = JSON.parse(cachedData) as Song[];
  //     console.log(this.songbook);
  //     this.songsUpdated.next(this.songbook);
  //     return this.songbook;
  //   }
  // }

  public getSongsFromAPI(): Observable<Song[]> {
    return this.http
      .get<Song[]>(`${this._url}songbook${this._userId}${this.username}.json`)
      .pipe(
        map((data) => {
          console.log("songsService: getSongsFromAPI()");
          if (!data) {
            console.log("vazio");
            return [];
          } else {
            const keys = Object.keys(data);
            const finalData: Song[] = [];
            for (let k of keys) {
              const song: Song = data[k];
              finalData.push(song);
            }
            this.songsUpdated.next(finalData);
            this.songbook = finalData;
            console.log(this.songbook);

            return finalData;
          }
        }),
        catchError((err) => {
          return throwError(err);
        })
      );
  }

  public getSongById(id: string): Song {
    return this.songbook.find((song) => song.id === id);
  }

  public getSongByName(songName: string): Song {
    return this.songbook.find((song) => song.name === songName);
  }

  public addSong(song: Song): Observable<Song> {
    return this.http
      .post<Song>(
        `${this._url}songbook${this._userId}${this.username}.json`,
        song,
        {
          responseType: "json",
          observe: "body",
        }
      )
      .pipe(
        tap((song) => {
          this.newSongAdded.next(song);
        })
      );
  }

  public destroySongs() {
    this.songsUpdated.next([]);
    this.songbook = [];
  }
}
