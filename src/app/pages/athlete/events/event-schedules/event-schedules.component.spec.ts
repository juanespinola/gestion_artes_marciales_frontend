import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSchedulesComponent } from './event-schedules.component';

describe('EventSchedulesComponent', () => {
  let component: EventSchedulesComponent;
  let fixture: ComponentFixture<EventSchedulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventSchedulesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
