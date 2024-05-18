import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FederationFormAuthoritiesComponent } from './federation-form-authorities.component';

describe('FederationFormAuthoritiesComponent', () => {
  let component: FederationFormAuthoritiesComponent;
  let fixture: ComponentFixture<FederationFormAuthoritiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FederationFormAuthoritiesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FederationFormAuthoritiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
