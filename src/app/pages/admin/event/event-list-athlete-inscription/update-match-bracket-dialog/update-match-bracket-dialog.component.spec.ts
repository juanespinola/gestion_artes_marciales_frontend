import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMatchBracketDialogComponent } from './update-match-bracket-dialog.component';

describe('UpdateMatchBracketDialogComponent', () => {
  let component: UpdateMatchBracketDialogComponent;
  let fixture: ComponentFixture<UpdateMatchBracketDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateMatchBracketDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateMatchBracketDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
