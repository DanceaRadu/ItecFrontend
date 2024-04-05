import { Component } from '@angular/core';
import {UserProfileService} from "../../../service/user-profile.service";
import {UserProfile} from "../../../entity/UserProfile";

@Component({
  selector: 'app-user-profile-dialog',
  templateUrl: './user-profile-dialog.component.html',
  styleUrl: './user-profile-dialog.component.scss'
})
export class UserProfileDialogComponent {

  userProfile: UserProfile | null = null;
  constructor(protected userProfileService: UserProfileService) {
    this.userProfileService.userProfileSubject.subscribe(
      (userProfile) => (this.userProfile = userProfile));
  }
}
