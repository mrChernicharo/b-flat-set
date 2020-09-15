import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { map, tap } from "rxjs/operators";
import { Song } from "../song.model";
import { Observable, of as observableOf, merge, BehaviorSubject } from "rxjs";
import { SongsService } from "../songs.service";
import { MatTable } from "@angular/material/table";

// TODO: Replace this with your own data model type

// TODO: replace this with real data from your application
let EXAMPLE_DATA: Song[] = [
  // { id: 1, name: "Hydrogen" },
  // { id: 2, name: "Helium" },
  // { id: 3, name: "Lithium" },
  // { id: 4, name: "Beryllium" },
  // { id: 5, name: "Boron" },
  // { id: 6, name: "Carbon" },
  // { id: 7, name: "Nitrogen" },
  // { id: 8, name: "Oxygen" },
  // { id: 9, name: "Fluorine" },
  // { id: 10, name: "Neon" },
  // { id: 11, name: "Sodium" },
  // { id: 12, name: "Magnesium" },
  // { id: 13, name: "Aluminum" },
  // { id: 14, name: "Silicon" },
  // { id: 15, name: "Phosphorus" },
  // { id: 16, name: "Sulfur" },
  // { id: 17, name: "Chlorine" },
  // { id: 18, name: "Argon" },
  // { id: 19, name: "Potassium" },
  // { id: 20, name: "Calcium" },
];

/**
 * Data source for the SongList2 view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class SongListDataSource extends DataSource<Song> {
  // data: Song[];
  // paginator: MatPaginator;
  // sort: MatSort;

  dataStream = new BehaviorSubject<Song[]>([]);

  set data(v: Song[]) {
    this.dataStream.next(v);
  }
  get data(): Song[] {
    return this.dataStream.value;
  }

  constructor(
    private paginator: MatPaginator,
    private sort: MatSort,
    private table: MatTable<Song>
  ) {
    super();
  }

  addData(songs: Song[], addedSong?: Song) {
    const copiedData = songs.slice();
    if (addedSong) {
      copiedData.push(addedSong);
    }
    this.data = copiedData;
    this.dataStream.next(this.data);
    console.log(this.data);
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
      this.dataStream,
      this.paginator.page,
      this.sort.sortChange,
      (this.table.dataSource = this.dataStream),
    ];

    // this.paginator.length = this.data.length;

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
        case "id":
          return compare(+a.id, +b.id, isAsc);
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
