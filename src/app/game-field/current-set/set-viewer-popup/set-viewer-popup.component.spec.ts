import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetViewerPopupComponent } from './set-viewer-popup.component';

describe('SetViewerPopupComponent', () => {
  let component: SetViewerPopupComponent;
  let fixture: ComponentFixture<SetViewerPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetViewerPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetViewerPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
