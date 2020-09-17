import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { SetsService } from "../sets/sets.service";
import { SongsService } from "../songs/songs.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  public username: string = "";

  constructor(
    private songsService: SongsService,
    private setsService: SetsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.songsService.getSongsFromAPI();
    this.setsService.fetchSets();
    this.authService.user.subscribe((user) => (this.username = user.username));

    // this.authService.user.subscribe((user) => {
    //   this.username = user.displayName;
    //   console.log(this.username);
    // });
  }
}
