import { AfterViewChecked, Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable } from "@angular/material/table";
import { Router } from "@angular/router";
import { delay, tap } from "rxjs/operators";
import { AuthService } from "../../auth/auth.service";
import { Song } from "../song.model";
import { SongsService } from "../songs.service";
import { SongListDataSource } from "./song-list-datasource";

@Component({
  selector: "app-song-list",
  templateUrl: "./song-list.component.html",
  styleUrls: ["./song-list.component.scss"],
})
export class SongListComponent implements AfterViewChecked, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Song>;
  dataSource: SongListDataSource;
  isLoading = false;
  data: Song[];
  // i: number = 0;
  displayedColumns = ["name", "actions", "key", "tempo", "style", "composer"];

  constructor(
    private authService: AuthService,
    private songsService: SongsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.songsService.userJustEntered
      .pipe(tap((bool) => {}))
      .subscribe((bool) => {
        console.log("just entered? " + bool);
        if (bool) {
          this.songsService
            .getSongsFromAPI()
            .pipe(delay(400))
            .subscribe((data) => {
              this.data = this.loadData(data);
              this.isLoading = false;
            });
        } else {
          console.log("just entered? " + bool);
          this.data = this.songsService.getCachedSongs();

          this.isLoading = false;
        }
        console.log("instancie dataSource " + bool);
      });
    this.dataSource = new SongListDataSource(this.songsService);
  }

  ngAfterViewChecked() {
    // console.log(`ngAfterViewChecked() ${this.i++}`);
    this.loadData(this.data);
    this.table.dataSource = this.dataSource;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  loadData(songs: Song[]) {
    return this.dataSource.addData(songs);
  }

  onNewSong() {
    this.router.navigate(["/songs/new"]);
  }
}
