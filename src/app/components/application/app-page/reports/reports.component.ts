import {Component, Input} from '@angular/core';
import {Application} from "../../../../entity/Application";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent {
  @Input({required:true}) app?: Application
}
