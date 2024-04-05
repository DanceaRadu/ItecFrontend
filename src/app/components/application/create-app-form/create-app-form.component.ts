import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApplicationService} from "../../../service/application.service";
import {SnackbarService} from "../../../service/snack-bar.service";

@Component({
  selector: 'app-create-app-form',
  templateUrl: './create-app-form.component.html',
  styleUrl: './create-app-form.component.scss'
})
export class CreateAppFormComponent {

  appForm: FormGroup
  isLoading = false;
  constructor(
    private formBuilder: FormBuilder,
    private appService: ApplicationService,
    private snackBarService: SnackbarService
  ) {
    this.appForm = this.formBuilder.group({
      name: ['', Validators.required],
      baseUrl: ['', Validators.required],
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
    }, () => {
      this.isLoading = false;
      this.snackBarService.show('Failed to create application')
    });
  }
}
