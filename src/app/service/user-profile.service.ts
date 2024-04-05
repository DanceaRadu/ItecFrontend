import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {UserProfile} from "../entity/UserProfile";
import {KeycloakService} from "keycloak-angular";
import {environment} from "../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  baseUrl = environment.baseUrl;
  userProfileSubject: BehaviorSubject<UserProfile | null> =
    new BehaviorSubject<UserProfile | null>(null);

  constructor(
    private http: HttpClient,
    private keycloakService: KeycloakService,
  ) { }

  getLoggedInUserProfile() {
    if(!this.keycloakService.isLoggedIn()) return;

    this.http.get<UserProfile>(environment.baseUrl + "/user-profile/me").subscribe((userProfile: UserProfile) => {
      this.userProfileSubject.next(userProfile);
    });
  }

  isLoggedIn(): boolean {
    return this.keycloakService.isLoggedIn();
  }

  login() {
    this.keycloakService.login();
  }

  logout() {
    this.keycloakService.logout();
  }
}
