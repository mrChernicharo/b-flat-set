import {
  AfterContentChecked,
  AfterViewInit,
  Component,
  OnInit,
} from "@angular/core";
import { HeaderService } from "src/app/components/header/header.service";
import { AuthService } from "../auth/auth.service";
import { SetsService } from "../sets/sets.service";
import { SongsService } from "../songs/songs.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent
  implements OnInit, AfterViewInit, AfterContentChecked {
  public username: string = "";

  constructor(
    private songsService: SongsService,
    private setsService: SetsService,
    private authService: AuthService,
    private headerService: HeaderService
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

  ngAfterViewInit() {
    // this.headerService.headerStatus.next({
    //   title: "dashboard",
    //   icon: "home",
    // });
  }

  ngAfterContentChecked() {
    this.headerService.headerStatus.next({
      title: "dashboard",
      icon: "home",
    });
  }
}
