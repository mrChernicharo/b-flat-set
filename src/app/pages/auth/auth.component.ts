import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit,
  ElementRef,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService, AuthResponseData } from "./auth.service";
import { Router } from "@angular/router";
import { SnackbarService } from "src/app/shared/snackbar.service";
import { Observable, Subject } from "rxjs";
import { HeaderService } from "src/app/components/header/header.service";
import {} from "../../shared/auto-focus.directive";
import { MatInput } from "@angular/material/input";
// import { cdkFocusInitial } from "@angular/cdk/text-field";
/**
 * @title Basic expansion panel
 */
@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  public signupForm: FormGroup;
  public panelOpenState = false;
  public panelState = new Subject<boolean>();
  public screenHeight: number;
  public isLoading = false;
  public authObservable: Observable<AuthResponseData>;
  public username: string;
  cd: ChangeDetectorRef = null;
  @ViewChild("nameInput") nameInputRef: ElementRef;
  @ViewChild("emailInput") emailInputRef: ElementRef;

  // @ViewChild("myElement") firstItem: MatSelect;

  constructor(
    private router: Router,
    private headerService: HeaderService,
    private authService: AuthService,
    private snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.panelState.subscribe((bool) => {
      this.panelOpenState = bool;
    });

    this.authService.user.subscribe((user) => (this.username = user.username));

    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });
    this.signupForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });
    this.headerService.headerStatus.next({ title: "auth", icon: "star" });
  }
  // ngAfterViewInit() {}
  handleLogin() {
    const email = this.loginForm.value["email"];
    const password = this.loginForm.value["password"];
    this.isLoading = true;

    this.authObservable = this.authService.login(email, password);

    this.authObservable.subscribe(
      (responseData) => {
        if (responseData) {
          this.isLoading = false;
          this.loginForm.reset();
          this.router.navigate(["/dashboard"]);
        }
      },
      (errorMessage) => {
        this.isLoading = false;
        this.snackbar.showErrorSnackBar(errorMessage);
      }
    );
  }

  handleSignUp() {
    const email = this.signupForm.value["email"];
    const password = this.signupForm.value["password"];
    const username = this.signupForm.value["username"];
    this.isLoading = true;

    this.authService.signUp(email, password, username).subscribe(
      (responseData) => {
        console.log(responseData);
        this.isLoading = false;
        this.signupForm.reset();
        this.router.navigate(["/dashboard"]);
      },
      (errorMessage) => {
        this.isLoading = false;
        this.snackbar.showErrorSnackBar(errorMessage);
      }
    );
  }

  scrollWindowToSingUp(panel) {
    console.log(panel);
    panel._body.nativeElement.scrollIntoView({ behavior: "smooth" });
  }

  onOpenPanel() {
    this.panelState.next(true);
    this.focusInput();
  }
  onClosePanel() {
    this.panelState.next(false);
    this.focusInput();
  }

  focusInput() {
    if (this.panelOpenState) {
      // console.log(this.nameInputRef);
      setTimeout(() => this.nameInputRef.nativeElement.focus(), 500);
    } else {
      // console.log(this.emailInputRef);
      setTimeout(() => this.emailInputRef.nativeElement.focus(), 500);
    }
  }

  loginFormSubmitOnKeydown(event) {
    // console.log(event);
    if (this.loginForm.valid) {
      this.handleLogin();
    }
  }

  signupFormSubmitOnKeydown(event) {
    // console.log(event);
    if (this.signupForm.valid) {
      this.handleSignUp();
    }
  }

  ngOnDestroy() {}
}

// @HostListener("window:resize", ["$event"]) getScreenHeight(event?) {
//   this.screenHeight = event.target.innerHeight;
//   this.panelOpenState
//     ? console.log(this.screenHeight)
//     : console.log("teu cú");
// }
