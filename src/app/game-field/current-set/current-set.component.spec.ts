import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentSetComponent } from './current-set.component';

describe('CurrentSetComponent', () => {
  let component: CurrentSetComponent;
  let fixture: ComponentFixture<CurrentSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentSetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
