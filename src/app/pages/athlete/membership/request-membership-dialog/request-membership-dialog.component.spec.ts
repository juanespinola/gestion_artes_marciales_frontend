import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestMembershipDialogComponent } from './request-membership-dialog.component';

describe('RequestMembershipDialogComponent', () => {
  let component: RequestMembershipDialogComponent;
  let fixture: ComponentFixture<RequestMembershipDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestMembershipDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestMembershipDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
