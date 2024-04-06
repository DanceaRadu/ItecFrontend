import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {UserProfile} from "../entity/UserProfile";
import {KeycloakService} from "keycloak-angular";
import {environment} from "../environments/environment.development";
import {Router} from "@angular/router";

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
    private router: Router
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
    this.keycloakService.logout().then(() => {
      this.userProfileSubject.next(null);
      this.keycloakService.clearToken();
      this.router.navigate(['/']);
    });
  }
}
