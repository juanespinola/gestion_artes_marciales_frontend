import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMatchBracketDialogComponent } from './view-match-bracket-dialog.component';

describe('ViewMatchBracketDialogComponent', () => {
  let component: ViewMatchBracketDialogComponent;
  let fixture: ComponentFixture<ViewMatchBracketDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewMatchBracketDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewMatchBracketDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
