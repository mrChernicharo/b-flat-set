import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  OnDestroy,
} from "@angular/core";
import {
  CdkDragDrop,
  CdkDragEnter,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import { SongsService } from "../../songs/songs.service";
import { Song } from "../../songs/song.model";
import { Router } from "@angular/router";
import { SetsService } from "../sets.service";
import { Setlist } from "../setlist.model";
import { AuthService } from "../../auth/auth.service";
import { Observable, of } from "rxjs";
import { delay, switchMap, tap } from "rxjs/operators";

@Component({
  selector: "app-new-set",
  templateUrl: "./new-set.component.html",
  styleUrls: ["./new-set.component.scss"],
})
export class NewSetComponent implements OnInit {
  songbook: string[] = [];
  setlist = [];
  setlistName: string = "new Setlist";
  // setObservable: Observable<Setlist>
  @Output("cdkDropListEntered") entered: EventEmitter<CdkDragEnter<any>>;
  @ViewChild("dropContainer") dropContainer: HTMLElement;

  constructor(
    private songsService: SongsService,
    private setsService: SetsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.songsService.songsUpdated.subscribe((data) => {
      console.log(data);
      console.log("new set");
      this.songbook = data.map((d) => d.name);
    });
    // this.songbook = this.songsService.songbook.map((d) => d.name);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  saveSet() {
    const setListSongs = this.setlist.map((item) => {
      return this.songsService.getSongByName(item);
    });
    console.log(setListSongs);

    const newSetlist = new Setlist(this.setlistName, setListSongs);
    this.setsService.createSet(newSetlist);
    this.setsService.persistSetlist(newSetlist);

    const setObservable = of(newSetlist).pipe(
      tap((data) => {
        // this.setsService.setCacheData([data, ...this.setsService.setlists]);
      }),
      delay(300)
    );
    setObservable.subscribe(() => this.goBack());
  }

  goBack() {
    // this.setsService.userJustEntered.next(false);
    this.router.navigate(["/sets"]);
  }

  cleanField() {
    this.setlistName = "";
  }
  // saveSet() {

  // }
}
