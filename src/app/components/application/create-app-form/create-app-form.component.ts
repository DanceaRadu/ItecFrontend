import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApplicationService} from "../../../service/application.service";
import {SnackbarService} from "../../../service/snack-bar.service";
import {Router} from "@angular/router";
import {UserProfileService} from "../../../service/user-profile.service";

@Component({
  selector: 'app-create-app-form',
  templateUrl: './create-app-form.component.html',
  styleUrl: './create-app-form.component.scss'
})
export class CreateAppFormComponent {

  appForm: FormGroup
  isLoading = false;
  refreshOptions = ["1 sec", "5 sec", "10 sec", "30 sec", "1 min", "5 min", "10 min"]
  timeToKeepOptions = ["1 min", "4 hours", "12 hours", "1 day", "3 days", "7 days"]
  constructor(
    private formBuilder: FormBuilder,
    private appService: ApplicationService,
    private snackBarService: SnackbarService,
    private router: Router,
    private userProfileService: UserProfileService
  ) {
    this.appForm = this.formBuilder.group({
      name: ['', Validators.required],
      baseUrl: ['', Validators.required],
      refreshInterval: ['', Validators.required],
      timeToKeep: ['', Validators.required],
      endpoints: this.formBuilder.array([
        this.createEndpoint()
      ])
    })
  }

  get endpoints() {
    return this.appForm.get('endpoints') as FormArray;
  }

  createEndpoint(): FormGroup {
    return this.formBuilder.group({
      relativeUrl: ['', Validators.required]
    });
  }

  addEndpoint() {
    this.endpoints.push(this.createEndpoint());
  }

  removeEndpoint(index: number) {
    this.endpoints.removeAt(index);
  }

  handleSubmit() {
    console.log(this.appForm.value);
    if(!this.appForm.valid) return;
    this.isLoading = true
    this.appService.createApp(this.appForm.value).subscribe((response) => {
      this.isLoading = false;
      this.snackBarService.show('Created new application.')
      this.userProfileService.getLoggedInUserProfile()
      this.router.navigate(['/user-profile/apps'])
    }, () => {
      this.isLoading = false;
      this.snackBarService.show('Failed to create application')
    });
  }
}
