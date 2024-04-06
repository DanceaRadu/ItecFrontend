import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApplicationShort} from "../../../entity/ApplicationShort";
import {Application} from "../../../entity/Application";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-sidebar-app',
  templateUrl: './sidebar-app.component.html',
  styleUrl: './sidebar-app.component.scss'
})
export class SidebarAppComponent implements OnInit {
  @Input() app!: ApplicationShort
  @Input() fullApp!: Application
  @Input() isSearchComponent = false
  @Output() removeApp = new EventEmitter<number>();
  @Output() pinApp = new EventEmitter<ApplicationShort>();

  imageError: boolean = false;
  constructor(private router: Router) {
  }

  ngOnInit(): void {
    if(this.isSearchComponent && this.fullApp) {
      this.app = {
        uid:this.fullApp.uid,
        name:this.fullApp.name,
        baseUrl:this.fullApp.baseUrl
      }
    }
  }

  onImageError(event: Event): void {
    this.imageError = true;
  }

  handleAppClick() {
    if(!this.isSearchComponent) {
      this.router.navigate(['/apps', this.app.uid]);
    }
  }

  isSelected() {
    return this.router.url.includes(this.app.uid + '');
  }
}
