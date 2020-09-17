import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { BehaviorSubject, Subject, Subscription } from "rxjs";
import { auditTime } from "rxjs/operators";
import { HeaderService } from "./header.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  title: Subject<string> = new BehaviorSubject<string>("dashboard");
  icon: Subject<string> = new BehaviorSubject<string>("home");
  // headerSubs: Subscription;

  constructor(
    private headerService: HeaderService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.headerService.headerStatus.subscribe((status) => {
      this.title.next(status.title);
      this.icon.next(status.icon);
      console.log("header subject emited!");
      this.cdr.detectChanges();
    });
  }

  ngAfterViewInit() {}

  toggleMenu() {
    this.headerService.toggleSideMenu();
  }
}
