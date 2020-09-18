import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { SongsService } from "../songs.service";
import { Song } from "../song.model";
import { Router } from "@angular/router";
import { SnackbarService } from "src/app/shared/snackbar.service";
import { delay, map, tap } from "rxjs/operators";
import { SongAddComponent } from "../song-add/song-add.component";

@Component({
  selector: "app-song-edit",
  templateUrl: "./song-edit.component.html",
  styleUrls: ["./song-edit.component.scss"],
})
export class SongEditComponent implements OnInit {
  editSongForm: FormGroup;
  songname: string;
  composer: string;
  style: string;
  key: string;
  tempo: number;

  keys = [
    "A",
    "Am",
    "Ab",
    "Abm",
    "G",
    "Gm",
    "Gb",
    "F#m",
    "F",
    "Fm",
    "E",
    "Em",
    "Eb",
    "Ebm",
    "D",
    "Dm",
    "Db",
    "C#m",
    "C",
    "Cm",
    "B",
    "Bm",
    "Bb",
    "Bbm",
  ];
  initialKey = this.keys[8];

  constructor(
    private songsService: SongsService,
    private snackbar: SnackbarService,
    private router: Router
  ) {}

  ngOnInit() {
    this.songsService.editingSong
      .pipe(
        tap((song) => {
          this.songname = song.name;
          this.composer = song.composer;
          this.key = song.key;
          this.tempo = song.tempo;
          this.style = song.style;
        })
      )
      .subscribe((song) => console.log(song));
    this.editSongForm = new FormGroup({
      name: new FormControl(this.songname, Validators.required),
      composer: new FormControl(this.composer, Validators.required),
      style: new FormControl(this.style, Validators.required),
      key: new FormControl(this.key, Validators.required),
      tempo: new FormControl(this.tempo, [
        Validators.required,
        Validators.min(30),
        Validators.max(300),
      ]),
    });
  }

  onSubmit() {}

  onCancel() {}

  submitFormOnKeydown(event) {}
}
