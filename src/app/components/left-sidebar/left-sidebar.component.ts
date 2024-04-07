import { Component } from '@angular/core';
import {ApplicationShort} from "../../entity/ApplicationShort";
import {MatDialog} from "@angular/material/dialog";
import {ChooseAppComponent} from "../application/choose-app/choose-app.component";

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrl: './left-sidebar.component.scss'
})
export class LeftSidebarComponent {
  savedApps: ApplicationShort[] = [];

  constructor(private dialog: MatDialog) {
    this.loadApps();
  }

  loadApps() {
    const apps = localStorage.getItem('savedApps');
    if (apps) {
      this.savedApps = JSON.parse(apps);
    }
  }



  handleRemoveApp(id: number) {
    this.savedApps = this.savedApps.filter(app => app.uid !== id);
    localStorage.setItem('savedApps', JSON.stringify(this.savedApps));
  }

  handlePinNewApp() {
    const dialogRef = this.dialog.open(ChooseAppComponent, {
      height: '500px',
      width: '400px'
    });

    const instance = dialogRef.componentInstance;

    instance.onAdd.subscribe((data) => {
      const exists = this.savedApps.find(item => item.uid === data.uid);
      if (!exists) {
        this.savedApps.push(data);
        localStorage.setItem('savedApps', JSON.stringify(this.savedApps));
      }
      // dialogRef.close();
    });

  }
}
