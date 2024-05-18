import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventFormContentComponent } from './event-form-content.component';

describe('EventFormContentComponent', () => {
  let component: EventFormContentComponent;
  let fixture: ComponentFixture<EventFormContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventFormContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventFormContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
