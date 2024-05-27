import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventFormEntryCategoriesComponent } from './event-form-entry-categories.component';

describe('EventFormEntryCategoriesComponent', () => {
  let component: EventFormEntryCategoriesComponent;
  let fixture: ComponentFixture<EventFormEntryCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventFormEntryCategoriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventFormEntryCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
