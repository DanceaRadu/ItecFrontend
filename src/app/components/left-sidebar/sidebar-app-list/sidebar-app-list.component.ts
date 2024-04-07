import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ApplicationShort} from "../../../entity/ApplicationShort";

@Component({
  selector: 'app-sidebar-app-list',
  templateUrl: './sidebar-app-list.component.html',
  styleUrl: './sidebar-app-list.component.scss'
})
export class SidebarAppListComponent {

  @Input({required: true}) appList!: ApplicationShort[];
  @Output() removeApp = new EventEmitter<number>();
}
