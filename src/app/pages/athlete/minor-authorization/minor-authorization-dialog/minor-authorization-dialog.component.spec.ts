import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinorAuthorizationDialogComponent } from './minor-authorization-dialog.component';

describe('MinorAuthorizationDialogComponent', () => {
  let component: MinorAuthorizationDialogComponent;
  let fixture: ComponentFixture<MinorAuthorizationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinorAuthorizationDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MinorAuthorizationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
