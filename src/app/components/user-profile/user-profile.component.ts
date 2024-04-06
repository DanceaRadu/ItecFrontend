import {Component, OnInit} from '@angular/core';
import {UserProfileService} from "../../service/user-profile.service";
import {UserProfile} from "../../entity/UserProfile";
import {MatDialog} from "@angular/material/dialog";
import {UserProfileDialogComponent} from "./user-profile-dialog/user-profile-dialog.component";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit{

  userProfile: UserProfile | null = null;

  constructor(
    protected userProfileService: UserProfileService,
    private dialog: MatDialog
  ) {
  }

  handleUserClick() {
    if(!this.userProfileService.isLoggedIn()) {
      this.userProfileService.login();
    } else {
      this.dialog.open(UserProfileDialogComponent, {
        height: '250px',
        width: '300px'
      });
    }
  }

  ngOnInit(): void {
    this.userProfileService.userProfileSubject.subscribe(
      (userProfile) => (this.userProfile = userProfile)
    );
  }
}
