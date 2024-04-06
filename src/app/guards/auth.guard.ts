import {CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {UserProfileService} from "../service/user-profile.service";

export const authGuard: CanActivateFn = async () => {
  const router = inject(Router);
  const userProfile = inject(UserProfileService);
  if (userProfile.isLoggedIn()) {
    return true;
  } else {
    return router.parseUrl('/');
  }
};
