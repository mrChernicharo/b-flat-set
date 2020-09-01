import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from '../../shared/user.model';
import { SnackbarService } from '../../shared/snackbar.service';
import { catchError, tap } from 'rxjs/operators';


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
  kind: string;
  localId: string;
  email: string;
  displayName?: string;
  refreshToken?: string;
  idToken: string;
  registered: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiKey = 'AIzaSyDGgFMchCz5PSiDauo3rxlofHoumhK87MU';
  private signUpEndpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`
  private loginEndpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`

  constructor(
    private http: HttpClient,
    private snackbarService: SnackbarService
  ) { }



  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      this.loginEndpoint, { email: email, password: password, returnSecureToken: true }, { responseType: 'json', observe: 'body' }
    ).pipe(
      catchError(this.handleError),
      tap(response => {
        let successMessage = `Welcome!`
        this.snackbarService.showSnackBar(successMessage)

        // console.log(response)
      }),
    )
  }


  signUp(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      this.signUpEndpoint, { email: email, password: password, returnSecureToken: true }, { responseType: 'json', observe: 'body' }
    ).pipe(
      catchError(this.handleError),
      tap(response => {
        let successMessage = 'Acount successfully created! You may now Login!'
        this.snackbarService.showSnackBar(successMessage)

        // console.log(response)
      })
    )

  }

  public handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error has occured';

    if (!errorResponse.error || !errorResponse.error.error) {

      return throwError(errorMessage);
    }
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'Email already in use';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Wrong email/password combination!';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Email address not found'
        break;

    }

    return throwError(errorMessage)
  }




}
