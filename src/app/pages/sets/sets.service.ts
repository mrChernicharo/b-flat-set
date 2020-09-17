import { Injectable, OnInit } from "@angular/core";
import { Song } from "../songs/song.model";
import { Setlist } from "./setlist.model";
import { SongsService } from "../songs/songs.service";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../auth/auth.service";
import { tap, map } from "rxjs/operators";
import { BehaviorSubject, Observable, of } from "rxjs";

interface ResponseData {
  [key: string]: Setlist[];
}

@Injectable({
  providedIn: "root",
})
export class SetsService {
  songbook = new BehaviorSubject<Song[]>(null);
  setlists: Setlist[] = [];
  userId: string = null;
  setlistsUpdated = new BehaviorSubject<Setlist[]>([]);
  // public userJustEntered = new BehaviorSubject<boolean>(true);

  constructor(
    private songsService: SongsService,
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.authService.user.subscribe((userData) => {
      this.userId = userData.id;
      this.songsService.songsUpdated.subscribe((songs) => {
        console.log(songs);
        this.songbook.next(songs);
      });
    });
    this.fetchSets().subscribe((setlists) => {
      this.setlistsUpdated.next(setlists);
    });
  }

  createSet(setlist: Setlist) {
    this.setlists.push(setlist);
  }

  fetchSets(): Observable<Setlist[]> {
    console.log("fetchSets");
    console.log(this.userId);
    if (!this.userId) {
      return of([]);
    }
    return this.http
      .get<ResponseData[]>(
        `${this.songsService.url}setlists${this.userId}.json`
      )
      .pipe(
        map((responseData) => {
          console.log("map() => responseData");
          console.log(responseData);
          if (responseData) {
            const setKeys = Object.keys(responseData);
            console.log("setKeys");
            console.log(setKeys[0]);

            const finalSets: Setlist[] = [];
            for (let [i, j] of setKeys.entries()) {
              let newSet = new Setlist(
                responseData[j].setlistName,
                responseData[j].songs
              );
              finalSets.push(newSet);
            }
            this.setlists = finalSets;
            return finalSets;
          } else {
            return [];
          }
        })
      );
  }

  persistSetlist(setlist: Setlist): Promise<Setlist> {
    console.log(setlist);
    return this.http
      .post<Setlist>(
        `${this.songsService.url}setlists${this.userId}.json`,
        setlist,
        { responseType: "json", observe: "body" }
      )
      .pipe(
        tap((data) => {
          console.log("persisting " + data);
        })
      )
      .toPromise();
  }

  // setCacheData(data: Setlist[]) {
  //   localStorage.setItem("setlists", JSON.stringify(data));
  // }

  // getCachedData(): Setlist[] {
  //   const cachedData = JSON.parse(localStorage.getItem("setlists"));
  //   console.log(cachedData);
  //   return cachedData as Setlist[];
  // }
}
