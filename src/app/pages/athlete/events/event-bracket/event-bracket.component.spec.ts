import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventBracketComponent } from './event-bracket.component';

describe('EventBracketComponent', () => {
  let component: EventBracketComponent;
  let fixture: ComponentFixture<EventBracketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventBracketComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventBracketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
