import { DataSource } from '@angular/cdk/collections';
import { Song } from '../song.model';
import { SongsService } from '../songs.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { OnInit, Injectable } from '@angular/core';

// TODO: Replace this with your own data model type
// export interface Song {
//   name: string;
//   id: number;
// }


// TODO: replace this with real data from your application
// const EXAMPLE_DATA: Song[] = [
//   {id: 1, name: 'Hydrogen'},
//   {id: 2, name: 'Helium'},
// ];

// const EXAMPLE_DATA: Song[]

/**
 * Data source for the SongList view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
// @Injectable()
export class SongListDataSource implements DataSource<Song> {
  data: Song[] = [];
  paginator: MatPaginator;
  sort: MatSort;

  constructor(
    private songsService: SongsService
  ) {
    this.songsService.getSongs().subscribe(data => {
      this.data = data;
      console.log(data)
    });
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Song[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() { }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Song[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Song[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'composer': return compare(+a.composer, +b.composer, isAsc);
        case 'key': return compare(+a.key, +b.key, isAsc);
        case 'tempo': return compare(+a.tempo, +b.tempo, isAsc);
        case 'style': return compare(+a.style, +b.style, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
