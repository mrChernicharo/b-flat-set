import { Component, OnInit } from "@angular/core";
import { SongsService } from "../songs/songs.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  constructor(private songsService: SongsService) {}

  ngOnInit(): void {
    this.songsService.getSongsFromAPI();
  }
}
