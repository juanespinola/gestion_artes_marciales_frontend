import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FederationsComponent } from './federations.component';

describe('FederationsComponent', () => {
  let component: FederationsComponent;
  let fixture: ComponentFixture<FederationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FederationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FederationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
