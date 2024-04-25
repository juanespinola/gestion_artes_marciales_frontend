import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FederationsLandingPageComponent } from './federations-landing-page.component';

describe('FederationsLandingPageComponent', () => {
  let component: FederationsLandingPageComponent;
  let fixture: ComponentFixture<FederationsLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FederationsLandingPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FederationsLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
