import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import {
  Observable,
  throwError,
  Subject,
  // BehaviorSubject,
  BehaviorSubject,
} from "rxjs";
import { User } from "./user.model";
import { SnackbarService } from "../../shared/snackbar.service";
import { catchError, map, tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { environment } from "../../../environments/environment";

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

interface IUserData {
  id: string;
  username: string;
  email: string;
  created_at: Date;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiKey: string = environment.firebaseAPIKey;
  private userDataEndpoint: string = "https://bflatset.firebaseio.com/";
  private signUpEndpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`;
  private loginEndpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`;
  public tokenExpirationTimer: any;
  public user = new BehaviorSubject<User>({} as User); // subject User
  public userLoggedOut = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private snackbarService: SnackbarService,
    // private songsService: SongsService,
    private router: Router
  ) {}

  public login(email: string, password: string): Observable<AuthResponseData> {
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
        })
      );
  }

  public signUp(
    email: string,
    password: string,
    username: string
  ): Observable<AuthResponseData> {
    return this.http
      .post<AuthResponseData>(
        this.signUpEndpoint,
        {
          email: email,
          password: password,
          username: username,
          returnSecureToken: true,
        },
        { responseType: "json", observe: "body" }
      )
      .pipe(
        catchError(this.handleError),
        tap((responseData) => {
          console.log("1. responseData");
          console.log(responseData);
          this.handleAuthSuccess(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            +responseData.expiresIn,
            username
          );
        })
        // tap((data) => {
        // })
      );
  }

  public async handleAuthSuccess(
    email: string,
    localId: string,
    idToken: string,
    expiresIn: number,
    username?: string
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const newUser = new User(
      localId,
      email,
      idToken,
      expirationDate,
      true,
      username
    );
    console.log("2. newUser");
    console.log(newUser);
    this.user.next(newUser);

    if (username) {
      // se tem username é singUp
      await this.saveUserData(localId, username, email);
      this.snackbarService.showSnackBar(
        `Conta criada com sucesso! Seja bem-vinde ${username.toUpperCase()}`
      );
    } else {
      // se não tem, é login
      const fetched = await this.getUserData(localId).then((d) => {
        console.log(d.created_at);
        return d;
      });
      const nextUser = Object.assign(newUser, {
        username: fetched.username,
        createdAt: fetched.created_at,
      });
      this.user.next(nextUser);
      console.log("3. nextUser");
      console.log(nextUser);
      this.snackbarService.showSnackBar(
        `Welcome back! ${fetched.username.toUpperCase()}`
      );
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
        errorMessage =
          "Endereço de email já em uso, Por favor use outro email para criar sua conta";
        // errorMessage = "Email already in use";
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

  public async autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
      createdAt: string;
      username: string;
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
      true,
      userData.username,
      userData.createdAt
    );

    if (loadedUser.token) {
      // console.log(loadedUser);
      this.user.next(loadedUser);
      const expirationTime =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogoff(expirationTime);
    }
  }

  public logout() {
    localStorage.removeItem("userData");
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    // this.user.complete();
    const blankUser = new User("", "", "", null, false, "", "");
    this.user.next(blankUser);
    this.userLoggedOut.next(true);
    // this.user.next(null);
    this.router.navigate(["/auth"]);
  }

  private autoLogoff(expirationTime: number): void {
    console.log(`token expiration ${expirationTime}ms`);
    this.tokenExpirationTimer = setTimeout(() => {
      this.snackbarService.showErrorSnackBar(
        "A Sessão expirou! Por favor faça login novamente"
        // "token expired! please login again"
      );
      this.logout();
    }, expirationTime);
  }

  private async saveUserData(
    id: string,
    username: string,
    email: string
  ): Promise<IUserData> {
    const creationDate = new Date();
    const newUserData = {
      id: id,
      username: username,
      email: email,
      created_at: creationDate.toUTCString(),
    };
    return this.http
      .post<IUserData>(`${this.userDataEndpoint}user${id}.json`, newUserData, {
        responseType: "json",
        observe: "body",
      })
      .toPromise();
  }

  private async getUserData(id: string): Promise<IUserData> {
    return this.http
      .get<any>(`${this.userDataEndpoint}user${id}.json`)
      .pipe(
        tap((request) => {
          console.log(request);
        })
      )
      .toPromise()
      .then((response) => {
        const key = Object.keys(response)[0];
        const fetchedData = response[key];
        console.log("fetchedData");
        console.log(fetchedData);
        return fetchedData;
      });
  }
}
