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
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";

@Component({
  selector: "app-song-list",
  templateUrl: "./song-list.component.html",
  styleUrls: ["./song-list.component.scss"],
  animations: [
    trigger("detailExpand", [
      state(
        "collapsed",
        style({ height: "0px", opacity: "0", minHeight: "0" })
      ),
      state("expanded", style({ height: "*", opacity: "1" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      ),
      transition("expanded <=> collapsed", animate("300ms ease-out")),
    ]),
  ],
})
export class SongListComponent implements AfterViewChecked, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Song>;
  dataSource: SongListDataSource;
  isLoading = false;
  data: Song[] = [];
  displayedColumns = ["name", "key", "tempo", "style", "composer"];
  expandedElement: Song | null;
  row: any;

  constructor(
    private authService: AuthService,
    private songsService: SongsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.songsService.songsUpdated.subscribe((data) => {
      this.data = data;
      this.isLoading = false;
    });

    if (this.data.length < 1) {
      console.log("entrei aqui");
      this.songsService.getSongsFromAPI().subscribe((data) => {
        this.data = data;
        this.isLoading = false;
      });
    }

    this.dataSource = new SongListDataSource(this.songsService);
  }

  ngAfterViewChecked() {
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

  colapseDetail(event) {
    console.log(event);
    console.log(event.target);
    console.log(event.srcElement.classList[1] === "middle");
    if (event.srcElement.classList[1] !== "middle") {
      this.expandedElement = this.expandedElement ? null : this.row;
    }
  }
}

// 0: "mat-row"
// 1: "cdk-row"
// 2: "detail-row" / "element-row"
// 3: "ng-tns-c155-1"
// 4: "ng-star-inserted"

//mat-row cdk-row detail-row ng-tns-c155-1 ng-star-inserted

//mat-row cdk-row element-row ng-tns-c155-1 ng-star-inserted
