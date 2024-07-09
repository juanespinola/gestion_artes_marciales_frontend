import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventListAthleteInscriptionComponent } from './event-list-athlete-inscription.component';

describe('EventListAthleteInscriptionComponent', () => {
  let component: EventListAthleteInscriptionComponent;
  let fixture: ComponentFixture<EventListAthleteInscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventListAthleteInscriptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventListAthleteInscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
