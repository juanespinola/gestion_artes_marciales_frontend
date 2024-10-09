import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SanctionDialogComponent } from './sanction-dialog.component';

describe('SanctionDialogComponent', () => {
  let component: SanctionDialogComponent;
  let fixture: ComponentFixture<SanctionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SanctionDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SanctionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
