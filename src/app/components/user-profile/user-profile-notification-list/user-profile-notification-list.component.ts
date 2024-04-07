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

  getAppNameByBugId(id: number): string {
    const application = this.userProfile?.addedApplications.find(application =>
      application.bugs!.some(bug => bug.uid === id)
    );

    if (application) {
      return application.name;
    } else {
      return ''
    }
  }

  handleMarkAsResolved(bugId: number): void {
    this.userProfileService.markBugAsResolved(bugId);
  }

}
