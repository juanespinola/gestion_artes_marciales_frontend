import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFormImagesComponent } from './new-form-images.component';

describe('NewFormImagesComponent', () => {
  let component: NewFormImagesComponent;
  let fixture: ComponentFixture<NewFormImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewFormImagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewFormImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
