import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationFormAuthoritiesComponent } from './association-form-authorities.component';

describe('AssociationFormAuthoritiesComponent', () => {
  let component: AssociationFormAuthoritiesComponent;
  let fixture: ComponentFixture<AssociationFormAuthoritiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssociationFormAuthoritiesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssociationFormAuthoritiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
