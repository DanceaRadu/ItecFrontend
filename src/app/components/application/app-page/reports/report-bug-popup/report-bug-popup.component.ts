import { Component } from '@angular/core';
import {BugService} from "../../../../../service/bug.service";

@Component({
  selector: 'app-report-bug-popup',
  templateUrl: './report-bug-popup.component.html',
  styleUrl: './report-bug-popup.component.scss'
})
export class ReportBugPopupComponent {
  constructor(private bugService: BugService) {
  }
}
