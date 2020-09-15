import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { map, tap } from "rxjs/operators";
import { Song } from "../song.model";
import {
  Observable,
  of as observableOf,
  merge,
  BehaviorSubject,
  of,
} from "rxjs";
import { SongsService } from "../songs.service";
import { MatTable } from "@angular/material/table";

/**
 * Data source for the SongList2 view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class SongListDataSource extends DataSource<Song> {
  paginator: MatPaginator;
  sort: MatSort;
  dataStream = new BehaviorSubject<Song[]>([]);

  set data(v: Song[]) {
    this.dataStream.next(v);
  }
  get data(): Song[] {
    return this.dataStream.value;
  }

  constructor() {
    super();
    console.log(this.data);
  }

  addData(songs: Song[], addedSong?: Song) {
    console.log("dataSource addData()");
    const copiedData = songs.slice();
    if (addedSong) {
      copiedData.push(addedSong);
    }
    this.dataStream.next(copiedData);
    // console.log({ "this.data": [...this.data] });

    return copiedData;
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
      this.sort.sortChange,
    ];

    return merge(...dataMutations).pipe(
      map(() => {
        return this.getPagedData(this.getSortedData([...this.data]));
      })
    );
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

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
    if (!this.sort.active || this.sort.direction === "") {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === "asc";
      switch (this.sort.active) {
        case "name":
          return compare(a.name, b.name, isAsc);
        case "composer":
          return compare(a.composer, b.composer, isAsc);
        case "key":
          return compare(a.key, b.key, isAsc);
        case "tempo":
          return compare(+a.tempo, +b.tempo, isAsc);
        case "style":
          return compare(a.style, b.style, isAsc);
        default:
          return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
