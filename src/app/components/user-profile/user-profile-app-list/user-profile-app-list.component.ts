import {Component, OnInit} from '@angular/core';
import {UserProfileService} from "../../../service/user-profile.service";
import {UserProfile} from "../../../entity/UserProfile";
import {ApplicationService} from "../../../service/application.service";
import {SnackbarService} from "../../../service/snack-bar.service";

@Component({
  selector: 'app-user-profile-app-list',
  templateUrl: './user-profile-app-list.component.html',
  styleUrl: './user-profile-app-list.component.scss'
})
export class UserProfileAppListComponent implements OnInit {

  userProfile: UserProfile | null = null;

  constructor(
    private userProfileService: UserProfileService,
    private applicationService: ApplicationService,
    private snackBar: SnackbarService
  ) {
  }

  ngOnInit(): void {
    this.userProfileService.userProfileSubject.subscribe((userProfile) => {
      this.userProfile = userProfile;
    });
  }

  handleAppDelete(id: number) {
    this.applicationService.deleteApp(id).subscribe(() => {
      this.userProfileService.deleteAppFromList(id);
    }, (error) => {
      this.snackBar.show("Error deleting app")
    });
  }
}
