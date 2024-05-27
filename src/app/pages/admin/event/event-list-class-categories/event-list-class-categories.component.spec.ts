import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventListClassCategoriesComponent } from './event-list-class-categories.component';

describe('EventListClassCategoriesComponent', () => {
  let component: EventListClassCategoriesComponent;
  let fixture: ComponentFixture<EventListClassCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventListClassCategoriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventListClassCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
