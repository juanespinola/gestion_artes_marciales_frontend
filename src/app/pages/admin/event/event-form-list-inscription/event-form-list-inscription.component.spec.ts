import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventFormListInscriptionComponent } from './event-form-list-inscription.component';

describe('EventFormListInscriptionComponent', () => {
  let component: EventFormListInscriptionComponent;
  let fixture: ComponentFixture<EventFormListInscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventFormListInscriptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventFormListInscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
