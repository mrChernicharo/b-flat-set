import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable } from "@angular/material/table";
import { Router } from "@angular/router";
import { of } from "rxjs";
import { AuthService } from "../../auth/auth.service";
import { Song } from "../song.model";
import { SongsService } from "../songs.service";
import { SongListDataSource } from "./song-list-datasource";

@Component({
  selector: "app-song-list",
  templateUrl: "./song-list.component.html",
  styleUrls: ["./song-list.component.scss"],
})
export class SongListComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Song>;
  dataSource: SongListDataSource;
  isLoading = false;
  data: Song[];
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ["name", "actions", "key", "tempo", "style", "composer"];

  constructor(
    private authService: AuthService,
    private songsService: SongsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.songsService.getSongsFromAPI().subscribe((data) => {
      this.data = this.loadData(data);
    });
    this.dataSource = new SongListDataSource(
      this.paginator,
      this.sort,
      this.table
    );
    this.isLoading = false;
  }

  ngAfterViewInit() {
    // this.table.dataSource = this.data;
  }

  loadData(songs: Song[]) {
    return this.dataSource.addData(songs);
  }

  onNewSong() {
    this.router.navigate(["/songs/new"]);
  }
}
