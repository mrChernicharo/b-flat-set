import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from '../../shared/user.model';
import { SnackbarService } from '../../shared/snackbar.service';
import { catchError } from 'rxjs/operators';


interface AuthResponseData {
  idToken: string;	// A Firebase Auth ID token for the newly created user.
  email: string;	// The email for the newly created user.
  refreshToken: string;	// A Firebase Auth refresh token for the newly created user.
  expiresIn: string;	// The number of seconds in which the ID token expires.
  localId: string;	// The uid of the newly created user.
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiKey = 'AIzaSyDGgFMchCz5PSiDauo3rxlofHoumhK87MU';
  private endpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`

  constructor(
    private http: HttpClient,
    private snackbarService: SnackbarService
  ) { }



  login(email: string, password: string) {

  }

  signUp(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      this.endpoint,
      { email: email, password: password, returnSecureToken: true },
      { responseType: 'json', observe: 'body' }
    ).pipe(catchError(errorResponse => {
      let errorMessage = 'An unknown error has occured';
      if (!errorResponse.error || !errorResponse.error.error) {
        return throwError(errorMessage);
      }
      switch (errorResponse.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'Email already in use';
          this.snackbarService.showErrorMessage(errorMessage)
      }
      return throwError(errorMessage)
    }))
  }


}
