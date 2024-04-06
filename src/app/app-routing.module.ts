import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CreateAppFormComponent} from "./components/application/create-app-form/create-app-form.component";
import {UserProfilePageComponent} from "./components/user-profile/user-profile-page/user-profile-page.component";
import {authGuard} from "./guards/auth.guard";

const routes: Routes = [
  {
    path: 'apps/create',
    component: CreateAppFormComponent,
    canActivate: [authGuard]
  },
  {
    path: 'user-profile',
    component: UserProfilePageComponent,
    canActivate: [authGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
