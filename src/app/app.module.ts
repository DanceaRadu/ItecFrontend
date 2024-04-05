import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from "@angular/material/datepicker";
import { MatHint } from "@angular/material/form-field";
import {MatButton, MatButtonModule, MatIconButton} from "@angular/material/button";
import { NavbarComponent } from './components/navbar/navbar.component';
import { LeftSidebarComponent } from './components/left-sidebar/left-sidebar.component';
import { MatIcon } from "@angular/material/icon";
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { KeycloakAngularModule, KeycloakService } from "keycloak-angular";
import {HttpClientModule} from "@angular/common/http";
import {MatDialogModule} from "@angular/material/dialog";
import { UserProfileDialogComponent } from './components/user-profile/user-profile-dialog/user-profile-dialog.component';

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
    UserProfileDialogComponent
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
  ],
  providers: [
    provideAnimationsAsync(),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
