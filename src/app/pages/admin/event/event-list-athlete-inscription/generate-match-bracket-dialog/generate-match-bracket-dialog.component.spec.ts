import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateMatchBracketDialogComponent } from './generate-match-bracket-dialog.component';

describe('GenerateMatchBracketDialogComponent', () => {
  let component: GenerateMatchBracketDialogComponent;
  let fixture: ComponentFixture<GenerateMatchBracketDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerateMatchBracketDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenerateMatchBracketDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
