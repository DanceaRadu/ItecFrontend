import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportBugPopupComponent } from './report-bug-popup.component';

describe('ReportBugPopupComponent', () => {
  let component: ReportBugPopupComponent;
  let fixture: ComponentFixture<ReportBugPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportBugPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportBugPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
