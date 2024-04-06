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
  savedApps: ApplicationShort[] = [
    {
      id: 1,
      name: "YouTube",
      basePath: "youtube.com"
    },
    {
      id: 2,
      name: "Twitter",
      basePath: "twitter.com"
    },
    {
      id: 3,
      name: "Facebook",
      basePath: "facebook.com"
    },
    {
      id: 4,
      name: "Instagram",
      basePath: "instagram.com"
    },
    {
      id: 5,
      name: "LinkedIn",
      basePath: "linkedin.com"
    },
    {
      id: 6,
      name: "Reddit",
      basePath: "reddit.com"
    },
    {
      id: 7,
      name: "TikTok",
      basePath: "tiktok.com"
    },
    {
      id: 8,
      name: "Pinterest",
      basePath: "pinterest.com"
    },
    {
      id: 9,
      name: "Snapchat",
      basePath: "snapchat.com"
    },
    {
      id: 10,
      name: "WhatsApp",
      basePath: "whatsapp.com"
    }
  ];

  constructor(private dialog: MatDialog) {
  }

  handleRemoveApp(id: number) {
    this.savedApps = this.savedApps.filter(app => app.id !== id);
    //TODO remove app from local storage
  }

  handlePinNewApp() {
    this.dialog.open(ChooseAppComponent, {
      height: '250px',
      width: '300px'
    });
  }
}
