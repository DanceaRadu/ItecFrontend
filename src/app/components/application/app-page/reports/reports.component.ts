import {Component, Input} from '@angular/core';
import {Application} from "../../../../entity/Application";
import {MatDialog} from "@angular/material/dialog";
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
      height: '320px',
      width: '400px',
      data: {app: this.app}
    });
  }

  formatDateAndTime = (date: Date | undefined) => {

    if(date === undefined) return '-';

    let actualDate = new Date(date)
    return new Intl.DateTimeFormat("en-US", {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).format(actualDate);
  };

}
