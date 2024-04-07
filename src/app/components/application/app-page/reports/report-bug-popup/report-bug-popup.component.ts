import {Component, Inject} from '@angular/core';
import {BugService} from "../../../../../service/bug.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SnackbarService} from "../../../../../service/snack-bar.service";

@Component({
  selector: 'app-report-bug-popup',
  templateUrl: './report-bug-popup.component.html',
  styleUrl: './report-bug-popup.component.scss'
})
export class ReportBugPopupComponent {

  bugForm: FormGroup
  isLoading = false;

  constructor(
    private bugService: BugService,
    private formBuilder: FormBuilder,
    private snackBar: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ReportBugPopupComponent>
  ) {
    this.bugForm = this.formBuilder.group({
      description: ['', Validators.required],
    })
  }

  handleSubmit() {
    this.isLoading = true;
    if (this.bugForm.valid) {
      this.bugService.createBugReport(
        {
          ...this.bugForm.value,
          applicationId: this.data.app.uid,
        }
      ).subscribe(() => {
        this.isLoading = false;
        this.snackBar.show("Bug report submitted successfully!")
        this.dialogRef.close();
      }, () => {
        this.isLoading = false;
        this.snackBar.show("Failed to submit bug report!")
      })
    }
  }
}
