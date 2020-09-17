import { Component, OnInit } from "@angular/core";
import { HeaderService } from "src/app/components/header/header.service";
import { AuthService } from "../auth/auth.service";
import { SongsService } from "./songs.service";

@Component({
  selector: "app-songs",
  templateUrl: "./songs.component.html",
  styleUrls: ["./songs.component.scss"],
})
export class SongsComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private songService: SongsService,
    private headerService: HeaderService
  ) {}

  ngOnInit(): void {
    this.auth.userLoggedOut.subscribe((bool) => {
      console.log("userLoggedOut" + bool);
      if (bool) {
        this.songService.destroySongs();
      }
    });
    this.headerService.headerStatus.next({
      title: "songs",
      icon: "music_note",
    });
    this.auth.user.subscribe((data) => console.log(data));
  }
}
