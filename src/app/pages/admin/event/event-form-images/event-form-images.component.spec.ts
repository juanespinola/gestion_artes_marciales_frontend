import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventFormImagesComponent } from './event-form-images.component';

describe('EventFormImagesComponent', () => {
  let component: EventFormImagesComponent;
  let fixture: ComponentFixture<EventFormImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventFormImagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventFormImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
