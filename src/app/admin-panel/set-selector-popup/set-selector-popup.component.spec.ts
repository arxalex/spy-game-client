import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetSelectorPopupComponent } from './set-selector-popup.component';

describe('SetPopupComponent', () => {
  let component: SetSelectorPopupComponent;
  let fixture: ComponentFixture<SetSelectorPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetSelectorPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetSelectorPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
