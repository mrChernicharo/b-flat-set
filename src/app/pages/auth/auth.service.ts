import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import {
  Observable,
  throwError,
  Subject,
  BehaviorSubject,
  ReplaySubject,
} from "rxjs";
import { User } from "./user.model";
import { SnackbarService } from "../../shared/snackbar.service";
import { catchError, tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { environment } from "../../../environments/environment";

// interface SignUpResponseData {
//   kind: string;
//   idToken: string;	// A Firebase Auth ID token for the newly created user.
//   localId: string;	// The uid of the newly created user.
//   email: string;	// The email for the newly created user.
//   refreshToken: string;	// A Firebase Auth refresh token for the newly created user.
//   expiresIn: string;	// The number of seconds in which the ID token expires.
// }

// interface LoginResponseData {
//   kind: string;
//   localId: string;
//   email: string;
//   displayName?: string;
//   idToken: string;
//   registered: boolean;
// }

export interface AuthResponseData {
  email: string;
  localId: string;
  idToken: string;
  expiresIn: string; // The number of seconds in which the ID token expires.
  kind: string;
  registered: boolean;
  displayName?: string;
  refreshToken?: string;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  // private apiKey = 'AIzaSyDGgFMchCz5PSiDauo3rxlofHoumhK87MU';
  private apiKey: string = environment.firebaseAPIKey;
  private signUpEndpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`;
  private loginEndpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`;
  public tokenExpirationTimer: any;
  public user = new ReplaySubject<User>(); // subject User

  constructor(
    private http: HttpClient,
    private snackbarService: SnackbarService,
    // private songsService: SongsService,
    private router: Router
  ) {}

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        this.loginEndpoint,
        { email: email, password: password, returnSecureToken: true },
        { responseType: "json", observe: "body" }
      )
      .pipe(
        catchError(this.handleError),
        tap((responseData) => {
          this.handleAuthSuccess(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn
          );
          // console.log(response)
        })
      );
  }

  signUp(
    email: string,
    password: string,
    username: string
  ): Observable<AuthResponseData> {
    return this.http
      .post<AuthResponseData>(
        this.signUpEndpoint,
        { email: email, password: password, returnSecureToken: true },
        { responseType: "json", observe: "body" }
      )
      .pipe(
        catchError(this.handleError),
        tap((responseData) => {
          this.handleAuthSuccess(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn,
            username
          );
          // console.log(response)
        })
      );
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem("userData");
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    this.router.navigate(["/auth"]);

    // this.isAuthenticated = !this.isAuthenticated;
    // this.authService.user.next(null);
  }

  public handleAuthSuccess(
    email: string,
    localId: string,
    idToken: string,
    expiresIn: number,
    username?: string
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const userName = username ? username : null;
    const newUser = new User(
      localId,
      email,
      idToken,
      expirationDate,
      true,
      userName
    );
    this.user.next(newUser);
    // console.log(newUser.id)
    console.log(this.user);

    if (userName) {
      // se tem username é singUp, senão, é login
      this.snackbarService.showSnackBar(
        "Acount successfully created! You may now Login!"
      );
    } else {
      // this.songsService.getSongs()
      this.snackbarService.showSnackBar(`Welcome back!`);
    }

    this.autoLogoff(expiresIn * 1000);
    localStorage.setItem("userData", JSON.stringify(newUser));
  }

  public handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = "An unknown error has occured";

    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
    }
    switch (errorResponse.error.error.message) {
      case "EMAIL_EXISTS":
        errorMessage = "Email already in use";
        break;
      case "INVALID_PASSWORD":
        errorMessage = "Wrong email/password combination!";
        break;
      case "EMAIL_NOT_FOUND":
        errorMessage = "Email address not found";
        break;
    }
    return throwError(errorMessage);
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      registered: true;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem("userData"));

    if (!userData) {
      this.router.navigate(["/auth"]);
      return;
    }
    const loadedUser = new User(
      userData.id,
      userData.email,
      userData._token,
      new Date(userData._tokenExpirationDate),
      true
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationTime =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogoff(expirationTime);
    }
  }

  autoLogoff(expirationTime: number) {
    console.log(`token expiration ${expirationTime}ms`);
    this.tokenExpirationTimer = setTimeout(() => {
      this.snackbarService.showErrorSnackBar(
        "token expired! please login again"
      );
      this.logout();
    }, expirationTime);
  }
}
