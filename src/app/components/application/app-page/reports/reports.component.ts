import {Component, Input} from '@angular/core';
import {Application} from "../../../../entity/Application";
import {MatDialog} from "@angular/material/dialog";
import {ChooseAppComponent} from "../../choose-app/choose-app.component";
import {ReportBugPopupComponent} from "./report-bug-popup/report-bug-popup.component";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent {
  @Input({required:true}) app?: Application

  constructor(private matDialog: MatDialog) {
  }

  handleReportBug() {
    const dialogRef = this.matDialog.open(ReportBugPopupComponent, {
      height: '500px',
      width: '400px'
    });
  }
}
