import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeltHistoryDetailDialogComponent } from './belt-history-detail-dialog.component';

describe('BeltHistoryDetailDialogComponent', () => {
  let component: BeltHistoryDetailDialogComponent;
  let fixture: ComponentFixture<BeltHistoryDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeltHistoryDetailDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BeltHistoryDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
