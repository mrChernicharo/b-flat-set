import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { SongsService } from "./songs.service";

@Component({
  selector: "app-songs",
  templateUrl: "./songs.component.html",
  styleUrls: ["./songs.component.scss"],
})
export class SongsComponent implements OnInit {
  constructor(private auth: AuthService, private songService: SongsService) {}

  ngOnInit(): void {
    // this.songService.getSongsFromAPI().subscribe((data) => {
    //   console.log(data);
    //   this.songService.songbook = data;
    //   this.
    // });
    this.auth.user.subscribe((data) => console.log(data));
  }
}
