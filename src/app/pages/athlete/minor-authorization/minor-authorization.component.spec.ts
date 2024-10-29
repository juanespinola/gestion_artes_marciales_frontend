import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinorAuthorizationComponent } from './minor-authorization.component';

describe('MinorAuthorizationComponent', () => {
  let component: MinorAuthorizationComponent;
  let fixture: ComponentFixture<MinorAuthorizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinorAuthorizationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MinorAuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
