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
import { SidebarAppListComponent } from './components/left-sidebar/sidebar-app-list/sidebar-app-list.component';
import { SidebarAppComponent } from './components/left-sidebar/sidebar-app/sidebar-app.component';
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {NgOptimizedImage} from "@angular/common";
import { UserProfileAppListComponent } from './components/user-profile/user-profile-app-list/user-profile-app-list.component';
import { UserProfileNotificationListComponent } from './components/user-profile/user-profile-notification-list/user-profile-notification-list.component';
import { ChooseAppComponent } from './components/application/choose-app/choose-app.component';
import { SearchBarComponent } from './components/shared/search-bar/search-bar.component';
import {MatExpansionPanel, MatExpansionPanelDescription, MatExpansionPanelTitle} from "@angular/material/expansion";
import {MatExpansionModule} from '@angular/material/expansion';
import {StopMousePropagationDirective} from "./components/shared/directive/stop-mouse-propagation.directive";
import { AppStatisticsComponent } from './components/application/app-page/app-statistics/app-statistics.component';
import { AppReportsComponent } from './components/application/app-page/app-reports/app-reports.component';
import { AppPageComponent } from './components/application/app-page/app-page/app-page.component';

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
    SidebarAppListComponent,
    SidebarAppComponent,
    UserProfileAppListComponent,
    UserProfileNotificationListComponent,
    ChooseAppComponent,
    SearchBarComponent,
    StopMousePropagationDirective,
    AppStatisticsComponent,
    AppReportsComponent,
    AppPageComponent,
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
    MatOption,
    MatSelect,
    NgOptimizedImage,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
    MatExpansionModule
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
