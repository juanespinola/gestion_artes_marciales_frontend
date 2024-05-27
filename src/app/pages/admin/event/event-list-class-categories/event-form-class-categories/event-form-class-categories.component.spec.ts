import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventFormClassCategoriesComponent } from './event-form-class-categories.component';

describe('EventFormClassCategoriesComponent', () => {
  let component: EventFormClassCategoriesComponent;
  let fixture: ComponentFixture<EventFormClassCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventFormClassCategoriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventFormClassCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
