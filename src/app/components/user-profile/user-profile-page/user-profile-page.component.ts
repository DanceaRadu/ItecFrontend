import {Component, OnInit} from '@angular/core';
import {UserProfile} from "../../../entity/UserProfile";
import {UserProfileService} from "../../../service/user-profile.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrl: './user-profile-page.component.scss'
})
export class UserProfilePageComponent implements OnInit{
  userProfile: UserProfile | null = null;
  constructor(private userProfileService: UserProfileService, private router: Router) {}

  ngOnInit(): void {
    this.userProfileService.userProfileSubject.subscribe((userProfile) => {
      this.userProfile = userProfile;
    });
  }

  isRouteActive(route: string): boolean {
    return this.router.url.includes(route)
  }
}
