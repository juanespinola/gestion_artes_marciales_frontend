import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinorAuthorizationFormComponent } from './minor-authorization-form.component';

describe('MinorAuthorizationFormComponent', () => {
  let component: MinorAuthorizationFormComponent;
  let fixture: ComponentFixture<MinorAuthorizationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinorAuthorizationFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MinorAuthorizationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
