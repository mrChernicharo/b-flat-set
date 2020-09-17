import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService, AuthResponseData } from "./auth.service";
import { Router } from "@angular/router";
import { SnackbarService } from "src/app/shared/snackbar.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Subscription, Observable } from "rxjs";
import { HeaderService } from "src/app/components/header/header.service";
/**
 * @title Basic expansion panel
 */
@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"],
})
export class AuthComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  signupForm: FormGroup;
  panelOpenState = false;
  isLoading = false;
  authObservable: Observable<AuthResponseData>;
  username: string;

  constructor(
    private router: Router,
    private headerService: HeaderService,
    private authService: AuthService,
    private snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
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
  }

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

  ngOnDestroy() {}
}
