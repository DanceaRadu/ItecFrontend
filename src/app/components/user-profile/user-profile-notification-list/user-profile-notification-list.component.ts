import {Component, OnInit} from '@angular/core';
import {UserProfileService} from "../../../service/user-profile.service";
import {UserProfile} from "../../../entity/UserProfile";
import {Bug} from "../../../entity/Bug";

@Component({
  selector: 'app-user-profile-notification-list',
  templateUrl: './user-profile-notification-list.component.html',
  styleUrl: './user-profile-notification-list.component.scss'
})
export class UserProfileNotificationListComponent implements OnInit {
  constructor(private userProfileService: UserProfileService) {}
  userProfile: UserProfile | null = null;

  ngOnInit(): void {
    this.userProfileService.userProfileSubject.subscribe((profile) => {
      this.userProfile = profile;
    })
  }

  getBugList(): Bug[] {
    return this.userProfile?.addedApplications.flatMap(application => application.bugs ? application.bugs : []) ?? [];
  }
}
