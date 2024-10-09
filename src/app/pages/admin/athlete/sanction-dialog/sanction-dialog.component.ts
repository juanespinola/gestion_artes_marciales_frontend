import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../../utils/api.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-sanction-dialog',
  standalone: true,
  imports: [],
  templateUrl: './sanction-dialog.component.html',
  styleUrl: './sanction-dialog.component.scss'
})
export class SanctionDialogComponent {
  constructor
  (
    public dialogRef: MatDialogRef<SanctionDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
  ){}
}
