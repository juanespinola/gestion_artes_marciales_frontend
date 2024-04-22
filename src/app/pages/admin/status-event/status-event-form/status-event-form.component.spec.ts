import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusEventFormComponent } from './status-event-form.component';

describe('StatusEventFormComponent', () => {
  let component: StatusEventFormComponent;
  let fixture: ComponentFixture<StatusEventFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusEventFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatusEventFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
