import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-songs",
  templateUrl: "./songs.component.html",
  styleUrls: ["./songs.component.scss"],
})
export class SongsComponent implements OnInit {
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.user.subscribe((data) => console.log(data));
  }
}
