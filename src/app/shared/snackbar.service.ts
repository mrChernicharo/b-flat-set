import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private matSnackbar: MatSnackBar

  ) { }

  showSnackBar(message: string) {
    this.matSnackbar.open(message, '❌', {
      duration: 3600,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: 'mat-snack-message',

    })
  }


  showErrorMessage(message: string): void {
    this.matSnackbar.open(
      message,
      '❌',
      {
        duration: 3600,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: 'mat-snack-error',
      }
    )
  }

}
