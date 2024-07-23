import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventMatchbracketDetailComponent } from './event-matchbracket-detail.component';

describe('EventMatchbracketDetailComponent', () => {
  let component: EventMatchbracketDetailComponent;
  let fixture: ComponentFixture<EventMatchbracketDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventMatchbracketDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventMatchbracketDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
