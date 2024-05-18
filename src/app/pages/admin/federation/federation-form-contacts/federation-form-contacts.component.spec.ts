import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FederationFormContactsComponent } from './federation-form-contacts.component';

describe('FederationFormContactsComponent', () => {
  let component: FederationFormContactsComponent;
  let fixture: ComponentFixture<FederationFormContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FederationFormContactsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FederationFormContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
