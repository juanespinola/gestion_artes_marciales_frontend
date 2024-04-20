import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypesEventFormComponent } from './types-event-form.component';

describe('TypesEventFormComponent', () => {
  let component: TypesEventFormComponent;
  let fixture: ComponentFixture<TypesEventFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypesEventFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TypesEventFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
