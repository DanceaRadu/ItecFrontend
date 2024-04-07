import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApplicationService} from "../../../service/application.service";
import {SnackbarService} from "../../../service/snack-bar.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserProfileService} from "../../../service/user-profile.service";
import {catchError, of} from "rxjs";
import {Application} from "../../../entity/Application";
import {Endpoint} from "../../../entity/Endpoint";

@Component({
  selector: 'app-create-app-form',
  templateUrl: './create-app-form.component.html',
  styleUrl: './create-app-form.component.scss'
})
export class CreateAppFormComponent {

  isEditPage = false;
  editedAppId?: number;

  appForm: FormGroup
  isLoading = false;
  refreshOptions = ["1 sec", "5 sec", "10 sec", "30 sec", "1 min", "5 min", "10 min"]
  timeToKeepOptions = ["1 min", "4 hours", "12 hours", "1 day", "3 days", "7 days"]
  constructor(
    private formBuilder: FormBuilder,
    private appService: ApplicationService,
    private snackBarService: SnackbarService,
    private router: Router,
    private userProfileService: UserProfileService,
    private route: ActivatedRoute
  ) {
    this.appForm = this.formBuilder.group({
      name: ['', Validators.required],
      baseUrl: ['', Validators.required],
      refreshInterval: ['', Validators.required],
      timeToKeep: ['', Validators.required],
      endpoints: this.formBuilder.array([
      ])
    })

    if (this.route.snapshot.url[1]?.path === 'edit') {
      this.isEditPage = true;
      this.editedAppId = parseInt(this.route.snapshot.params['id']);
      this.appService
        .getAppById(this.editedAppId)
        .pipe(
          catchError((error) => {
            if (error.status === 404) router.navigate(['/']);
            return of(null);
          }),
        )
        .subscribe((response) => {
          if (response) {
            console.log(response)
            this.prepopulateAppForm(response);
          }
        });
    } else {
      const endpoints = this.appForm.get(
        'endpoints',
      ) as FormArray;
      endpoints.push(this.createEndpoint());
    }
  }

  prepopulateAppForm(app: Application) {
    this.appForm.patchValue({
      name: app.name,
      baseUrl: app.baseUrl,
      refreshInterval: app.refreshInterval,
      timeToKeep: app.timeToKeep,
    });
    const endpoints = this.appForm.get(
      'endpoints',
    ) as FormArray;
    if(!app.endpoints) return;
    app.endpoints.forEach((endpoint) => {
      endpoints.push(this.createEndpointFromEndpoint(endpoint));
    });
  }

  get endpoints() {
    return this.appForm.get('endpoints') as FormArray;
  }

  createEndpoint(): FormGroup {
    return this.formBuilder.group({
      relativeUrl: ['', Validators.required]
    });
  }

  createEndpointFromEndpoint(endpoint: Endpoint): FormGroup {
    return this.formBuilder.group({
      relativeUrl: [endpoint.relativeUrl, Validators.required]
    });
  }

  addEndpoint() {
    this.endpoints.push(this.createEndpoint());
  }

  removeEndpoint(index: number) {
    this.endpoints.removeAt(index);
  }

  handleSubmit() {
    if(!this.appForm.valid) return;
    this.isLoading = true
    if(!this.isEditPage) {
      this.appService.createApp(this.appForm.value).subscribe((response) => {
        this.isLoading = false;
        this.snackBarService.show('Created new application.')
        this.userProfileService.getLoggedInUserProfile()
        this.router.navigate(['/user-profile/apps'])
      }, () => {
        this.isLoading = false;
        this.snackBarService.show('Failed to create application')
      });
    } else if(this.isEditPage && this.editedAppId) {
      this.appService.updateApp(this.appForm.value, this.editedAppId).subscribe((response) => {
        this.isLoading = false;
        this.snackBarService.show('Updated.')
        this.userProfileService.getLoggedInUserProfile()
        this.router.navigate(['/user-profile/apps'])
      }, () => {
        this.isLoading = false;
        this.snackBarService.show('Failed to update application')
      });
    }
  }
}
