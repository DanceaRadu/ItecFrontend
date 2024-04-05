import { Component } from '@angular/core';
import {UserProfileService} from "./service/user-profile.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(private userProfileService: UserProfileService) {
    userProfileService.getLoggedInUserProfile();
  }
}
