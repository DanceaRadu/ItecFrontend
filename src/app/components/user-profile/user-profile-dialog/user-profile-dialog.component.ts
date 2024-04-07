import { Component } from '@angular/core';
import {UserProfileService} from "../../../service/user-profile.service";
import {UserProfile} from "../../../entity/UserProfile";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-profile-dialog',
  templateUrl: './user-profile-dialog.component.html',
  styleUrl: './user-profile-dialog.component.scss'
})
export class UserProfileDialogComponent {

  userProfile: UserProfile | null = null;
  constructor(
    protected userProfileService: UserProfileService,
    private dialogRef: MatDialog,
    private router: Router
  ) {
    this.userProfileService.userProfileSubject.subscribe(
      (userProfile) => (this.userProfile = userProfile));
  }

  handleGoToUserProfile() {
    this.dialogRef.closeAll();
    this.router.navigate(['/user-profile', 'apps']);
  }
}
