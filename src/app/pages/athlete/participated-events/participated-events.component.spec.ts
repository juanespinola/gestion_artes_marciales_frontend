import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipatedEventsComponent } from './participated-events.component';

describe('ParticipatedEventsComponent', () => {
  let component: ParticipatedEventsComponent;
  let fixture: ComponentFixture<ParticipatedEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParticipatedEventsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParticipatedEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
