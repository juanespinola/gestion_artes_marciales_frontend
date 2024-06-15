import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmInscriptionDialogComponent } from './confirm-inscription-dialog.component';

describe('ConfirmInscriptionDialogComponent', () => {
  let component: ConfirmInscriptionDialogComponent;
  let fixture: ComponentFixture<ConfirmInscriptionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmInscriptionDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmInscriptionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
