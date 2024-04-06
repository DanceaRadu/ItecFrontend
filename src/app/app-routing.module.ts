import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CreateAppFormComponent} from "./components/application/create-app-form/create-app-form.component";
import {UserProfilePageComponent} from "./components/user-profile/user-profile-page/user-profile-page.component";
import {authGuard} from "./guards/auth.guard";
import {
  UserProfileAppListComponent
} from "./components/user-profile/user-profile-app-list/user-profile-app-list.component";
import {
  UserProfileNotificationListComponent
} from "./components/user-profile/user-profile-notification-list/user-profile-notification-list.component";
import {AppPageComponent} from "./components/application/app-page/app-page/app-page.component";

const routes: Routes = [
  {
    path: 'apps/create',
    component: CreateAppFormComponent,
    canActivate: [authGuard]
  },
  {
    path: 'user-profile',
    component: UserProfilePageComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'apps',
        component: UserProfileAppListComponent,
      },
      {
        path: 'notifications',
        component: UserProfileNotificationListComponent,
      },
    ]
  },
  {
    path: 'apps/:id',
    component: AppPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
