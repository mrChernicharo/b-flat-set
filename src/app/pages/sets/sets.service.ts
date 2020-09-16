import { Injectable, OnInit } from "@angular/core";
import { Song } from "../songs/song.model";
import { Setlist } from "./setlist.model";
import { SongsService } from "../songs/songs.service";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../auth/auth.service";
import { tap, map } from "rxjs/operators";
import { BehaviorSubject, Observable } from "rxjs";

interface ResponseData {
  [key: string]: Setlist[];
}

@Injectable({
  providedIn: "root",
})
export class SetsService {
  songbook: Song[] = [];
  setlists: Setlist[] = [];
  userId: string = null;
  setlistsUpdated = new BehaviorSubject<Setlist[]>(null);
  public userJustEntered = new BehaviorSubject<boolean>(true);

  constructor(
    private songsService: SongsService,
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.authService.user.subscribe((userData) => {
      this.userId = userData.id;
    });
  }

  createSet(setlist: Setlist) {
    this.setlists.push(setlist);
  }

  fetchSets(): Observable<Setlist[]> {
    if (!this.userId) {
      return;
    }
    return this.http
      .get<ResponseData[]>(
        `${this.songsService.url}setlists${this.userId}.json`
      )
      .pipe(
        map((responseData) => {
          const setKeys = Object.keys(responseData);
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
        })
      );
  }

  persistSetlist(setlist: Setlist): Promise<Setlist> {
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

  setCacheData(data: Setlist[]) {
    localStorage.setItem("setlists", JSON.stringify(data));
  }

  getCachedData(): Setlist[] {
    const cachedData = JSON.parse(localStorage.getItem("setlists"));
    console.log(cachedData);
    return cachedData as Setlist[];
  }
}
