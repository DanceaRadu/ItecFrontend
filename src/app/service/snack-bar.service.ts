import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(private snackbar: MatSnackBar) {}

  show(message: string, config?: Partial<SnackBarConfig>) {
    const snackbarConfig: MatSnackBarConfig = {
      duration: 2500,
      panelClass: ['snackbar'],
      ...config,
    };
    this.snackbar.open(message, '', snackbarConfig);
  }
}

interface SnackBarConfig {
  duration?: number;
  panelClass?: string[];
}
