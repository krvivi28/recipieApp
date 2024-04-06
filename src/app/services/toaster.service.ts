import { Injectable, NgZone } from "@angular/core";
import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarConfig,
  MatSnackBarLabel,
  MatSnackBarRef,
} from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class ToasterService {
  private config!: MatSnackBarConfig;

  constructor(private toaster: MatSnackBar, private zone: NgZone) {
    this.config = new MatSnackBarConfig();
    this.config.panelClass = ["snackbar-container"];
    this.config.verticalPosition = "top";
    this.config.horizontalPosition = "right";
    this.config.duration = 3000;
  }

  error(message: string) {
    this.config.panelClass = ["snackbar-container", "error"];
    this.show(message, "❕");
  }

  success(message: string) {
    this.config.panelClass = ["snackbar-container", "success"];
    this.show(message, "Done");
  }
  warning(message: string) {
    this.config.panelClass = ["snackbar-container", "warning"];
    this.show(message, "❕");
  }

  private show(message: string, action: string, config?: MatSnackBarConfig) {
    config = config || this.config;
    this.zone.run(() => {
      this.toaster.open(message, action, config);
    });
  }
}
