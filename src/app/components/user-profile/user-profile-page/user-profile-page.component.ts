import {Component, OnInit} from '@angular/core';
import {UserProfile} from "../../../entity/UserProfile";
import {UserProfileService} from "../../../service/user-profile.service";

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrl: './user-profile-page.component.scss'
})
export class UserProfilePageComponent implements OnInit{
  userProfile: UserProfile | null = null;
  constructor(private userProfileService: UserProfileService) {}

  ngOnInit(): void {
    this.userProfileService.userProfileSubject.subscribe((userProfile) => {
      this.userProfile = userProfile;
    });
  }
}
