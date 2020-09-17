import { DataSource } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { map } from "rxjs/operators";
import { Song } from "../song.model";
import { Observable, of, merge, BehaviorSubject } from "rxjs";
import { SongsService } from "../songs.service";

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

  constructor(private songsService: SongsService) {
    super();

    this.songsService.songsUpdated.subscribe((backendData) => {
      this.data = backendData;
    });
    this.dataStream.next(this.data);
  }

  addData(songs?: Song[], addedSong?: Song): Song[] {
    if (addedSong) {
      const copiedData = songs.slice();
      copiedData.push(addedSong);
      this.songsService.songsUpdated.next(copiedData);
      this.dataStream.next(copiedData);
      return copiedData;
    } else {
      return this.data;
    }
  }

  connect(): Observable<Song[]> {
    const dataMutations = [
      of(this.data),
      this.paginator.page,
      this.sort.sortChange,
    ];

    return merge(...dataMutations).pipe(
      map(() => {
        return this.getPagedData(this.getSortedData([...this.data]));
      })
    );
  }

  disconnect() {}

  private getPagedData(data: Song[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

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

function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
