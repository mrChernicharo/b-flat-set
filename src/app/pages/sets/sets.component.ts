import {
  Component,
  OnInit,
  Input,
  HostListener,
  OnDestroy,
} from "@angular/core";
import { Router } from "@angular/router";
import { SetsService } from "./sets.service";
import { Setlist } from "./setlist.model";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-sets",
  templateUrl: "./sets.component.html",
  styleUrls: ["./sets.component.scss"],
})
export class SetsComponent implements OnInit, OnDestroy {
  screenWidth: number;
  screenHeight: number;
  sets: Setlist[] = [];
  userId: string = null;
  @Input() cols: number = 2;
  isLoading: boolean = false;

  authSubs: Subscription;
  setsSubs: Subscription;

  constructor(
    private setsService: SetsService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.authSubs = this.authService.user.subscribe((user) => {
      this.userId = user.id;
    });
    // this.sets = this.setsService.setlists
    this.screenWidth = window.innerWidth;
    this.screenWidth >= 1200 ? (this.cols = 2) : (this.cols = 1);
    this.setsSubs = this.setsService.userJustEntered.subscribe((bool) => {
      console.log("just Entered?" + bool);
      if (bool) {
        this.setsService.fetchSets().subscribe((responseData) => {
          this.sets = responseData;
          this.isLoading = false;
        });
      } else {
        console.log("just Entered?" + bool);

        this.sets = this.setsService.getCachedData();

        this.isLoading = false;
      }
    });
    // this.setsSubs =
  }

  @HostListener("window:resize", ["$event"]) getScreenResize(event?) {
    this.screenWidth = event.target.innerWidth;
    this.screenWidth >= 1200 ? (this.cols = 2) : (this.cols = 1);
  }

  gotoSet() {
    this.router.navigate(["/sets/new"]);
  }

  ngOnDestroy() {
    this.authSubs.unsubscribe();
    this.setsSubs.unsubscribe();
  }
}
