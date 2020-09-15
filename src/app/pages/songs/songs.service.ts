import { Injectable, OnInit } from "@angular/core";
import { Song } from "./song.model";
import {
  Observable,
  of,
  Subject,
  BehaviorSubject,
  ReplaySubject,
  throwError,
} from "rxjs";
import { map, tap, take, delay, catchError, switchMap } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "../auth/auth.service";
import { error } from "@angular/compiler/src/util";

@Injectable({ providedIn: "root" })
export class SongsService {
  public newSongAdded = new Subject<Song>();
  public userJustEntered = new BehaviorSubject<boolean>(true);
  public songsUpdated = new ReplaySubject<Song[]>();
  public songbook: Song[] = [];
  // public url: string = 'http://localhost:3001/songs';
  private _url: string = "https://bflatset.firebaseio.com/";
  private _userId: string;
  constructor(private http: HttpClient, private authService: AuthService) {
    // this.getSongsFromAPI();
  }

  get url() {
    return this._url;
  }

  get userId() {
    return this._userId;
  }

  public getCachedSongs(): Song[] {
    console.log("songsService: getCahedSongs()");

    const cachedData = localStorage.getItem("songbook");
    if (cachedData) {
      this.songbook = JSON.parse(cachedData) as Song[];
      console.log(this.songbook);
      this.songsUpdated.next(this.songbook);
      return this.songbook;
    }
  }

  public getSongsFromAPI(): Observable<Song[]> {
    this.authService.user.pipe(take(1)).subscribe((userData) => {
      this._userId = userData.id;
    });
    if (this._userId) {
      return this.http
        .get<Song[]>(`${this._url}songbook${this._userId}.json`)
        .pipe(
          tap(() => console.log("songsService: getSongsFromAPI()")),
          map((data) => {
            if (data.length < 1) {
              return this.getCachedSongs();
            }
            const keys = Object.keys(data);
            const finalData: Song[] = [];
            for (let k of keys) {
              const song: Song = data[k];
              finalData.push(song);
            }
            this.songbook = finalData;
            this.songsUpdated.next(finalData);
            console.log(this.songbook);
            // set cache:
            localStorage.setItem("songbook", JSON.stringify(finalData));
            return finalData;
          }),
          catchError((err, stream) => {
            console.log("err-> " + err);
            console.log("stream-> " + stream);

            return throwError(err);
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
