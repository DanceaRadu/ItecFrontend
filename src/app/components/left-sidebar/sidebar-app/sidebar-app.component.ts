import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ApplicationShort} from "../../../entity/ApplicationShort";

@Component({
  selector: 'app-sidebar-app',
  templateUrl: './sidebar-app.component.html',
  styleUrl: './sidebar-app.component.scss'
})
export class SidebarAppComponent {
  @Input({required: true}) app!: ApplicationShort
  @Output() removeApp = new EventEmitter<number>();

  imageError: boolean = false;
  onImageError(event: Event): void {
    this.imageError = true;
  }
}
