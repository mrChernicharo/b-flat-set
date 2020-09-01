import { AfterViewInit, Component, OnInit, OnDestroy, ViewChild, AfterViewChecked } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { SongListDataSource } from './song-list-datasource';
import { Song } from '../song.model';
import { SongsService } from '../songs.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss']
})

// AfterViewInit,
export class SongListComponent implements AfterViewChecked, OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Song>;
  dataSource: SongListDataSource;
  isLoading = false;
  // userId: string;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'actions', 'key', 'tempo', 'style', 'composer'];

  constructor(
    private authService: AuthService,
    private songsService: SongsService,
    private router: Router) { }

  ngOnInit() {
    // this.authService.user.subscribe(data => this.userId = data.id)
    this.dataSource = new SongListDataSource(this.songsService);
    this.isLoading = true;

  }

  ngAfterViewChecked() {
    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
      this.isLoading = false;
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
