import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FederationFormComponent } from './federation-form.component';

describe('FederationFormComponent', () => {
  let component: FederationFormComponent;
  let fixture: ComponentFixture<FederationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FederationFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FederationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
