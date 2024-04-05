import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CreateAppFormComponent} from "./components/application/create-app-form/create-app-form.component";
import {UserProfilePageComponent} from "./components/user-profile/user-profile-page/user-profile-page.component";

const routes: Routes = [
  {
    path: 'apps/create',
    component: CreateAppFormComponent,
  },
  {
    path: 'user-profile',
    component: UserProfilePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
