import { AfterViewInit, Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { SongListDataSource } from './song-list-datasource';
import { Song } from '../song.model';
import { SongsService } from '../songs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss']
})
export class SongListComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Song>;
  dataSource: SongListDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'actions', 'key', 'tempo', 'style', 'composer'];

  constructor(
    private songsService: SongsService,
    private router: Router) { }

  ngOnInit() {
    this.dataSource = new SongListDataSource(this.songsService);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    }, 600);
  }


  onNewSong() {
    this.router.navigate(['/songs/new'])
  }

  ngOnDestroy() {
    this.sort = null;
    this.paginator = null;
    this.table.dataSource = null;
    this.dataSource = null;
  }
}
