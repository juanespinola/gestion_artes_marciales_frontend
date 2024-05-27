import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventListEntryCategoriesComponent } from './event-list-entry-categories.component';

describe('EventListEntryCategoriesComponent', () => {
  let component: EventListEntryCategoriesComponent;
  let fixture: ComponentFixture<EventListEntryCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventListEntryCategoriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventListEntryCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
