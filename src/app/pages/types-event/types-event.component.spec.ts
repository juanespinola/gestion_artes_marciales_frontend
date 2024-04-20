import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypesEventComponent } from './types-event.component';

describe('TypesEventComponent', () => {
  let component: TypesEventComponent;
  let fixture: ComponentFixture<TypesEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypesEventComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TypesEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
