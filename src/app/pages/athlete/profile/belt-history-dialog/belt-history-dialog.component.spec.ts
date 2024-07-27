import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeltHistoryDialogComponent } from './belt-history-dialog.component';

describe('BeltHistoryDialogComponent', () => {
  let component: BeltHistoryDialogComponent;
  let fixture: ComponentFixture<BeltHistoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeltHistoryDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BeltHistoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
