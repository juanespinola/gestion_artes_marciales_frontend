import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationFormContactsComponent } from './association-form-contacts.component';

describe('AssociationFormContactsComponent', () => {
  let component: AssociationFormContactsComponent;
  let fixture: ComponentFixture<AssociationFormContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssociationFormContactsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssociationFormContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
