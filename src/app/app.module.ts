import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from "@angular/material/datepicker";
import {MatFormField, MatFormFieldModule, MatHint} from "@angular/material/form-field";
import {MatButton, MatButtonModule, MatIconButton} from "@angular/material/button";
import { NavbarComponent } from './components/navbar/navbar.component';
import { LeftSidebarComponent } from './components/left-sidebar/left-sidebar.component';
import {MatIcon, MatIconModule} from "@angular/material/icon";
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { KeycloakAngularModule, KeycloakService } from "keycloak-angular";
import {HttpClientModule} from "@angular/common/http";
import {MatDialogModule} from "@angular/material/dialog";
import { UserProfileDialogComponent } from './components/user-profile/user-profile-dialog/user-profile-dialog.component';
import { CreateAppFormComponent } from './components/application/create-app-form/create-app-form.component';
import {MatInput} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MAT_SNACK_BAR_DEFAULT_OPTIONS} from "@angular/material/snack-bar";
import { UserProfilePageComponent } from './components/user-profile/user-profile-page/user-profile-page.component';


function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'https://keycloak.gonemesis.org',
        realm: 'itec',
        clientId: 'itec'
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      }
    });
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LeftSidebarComponent,
    UserProfileComponent,
    UserProfileDialogComponent,
    CreateAppFormComponent,
    UserProfilePageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDatepickerToggle,
    MatDatepicker,
    MatHint,
    MatDatepickerInput,
    MatButton,
    MatIcon,
    KeycloakAngularModule,
    MatIconButton,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatProgressSpinner,
  ],
  providers: [
    provideAnimationsAsync(),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    },
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
