import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
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

@Component({
  selector: "app-new-set",
  templateUrl: "./new-set.component.html",
  styleUrls: ["./new-set.component.scss"],
})
export class NewSetComponent implements OnInit {
  songbook: string[] = [];
  setlist = [];
  setlistName: string = "new Setlist";

  // @Output('cdkDropListEntered') entered: EventEmitter<CdkDragEnter<any>>
  // @ViewChild('dropContainer') dropContainer: HTMLElement;

  constructor(
    private songsService: SongsService,
    private setsService: SetsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.songsService.songsUpdated.subscribe((data) => {
      console.log(data);
      this.songbook = data.map((d) => d.name);
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      // console.log(event.container.data); console.log(event.previousIndex); console.log(event.currentIndex)
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      // console.log(`previous ${event.previousContainer.data}`); console.log(`current ${event.container.data}`); console.log(event.previousIndex); console.log(event.currentIndex);
    }
  }

  async saveSet() {
    console.log(this.setlist);
    const setListSongs = this.setlist.map((item) => {
      return this.songsService.getSongByName(item);
    });

    const newSetlist = new Setlist(this.setlistName, setListSongs);
    this.setsService.createSet(newSetlist);
    await this.setsService.persistSetlist(newSetlist);
    this.goBack();
  }

  goBack() {
    this.router.navigate(["/sets"]);
  }

  cleanField() {
    this.setlistName = "";
  }
}
