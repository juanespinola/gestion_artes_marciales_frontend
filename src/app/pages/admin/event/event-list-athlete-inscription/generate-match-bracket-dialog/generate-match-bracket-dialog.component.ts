import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../../../utils/api.service';
import { MaterialModule } from '../../../components/material.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { AlertsService } from '../../../../../services/alerts.service';

@Component({
  selector: 'app-generate-match-bracket-dialog',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './generate-match-bracket-dialog.component.html',
  styleUrl: './generate-match-bracket-dialog.component.scss'
})
export class GenerateMatchBracketDialogComponent {
  
  formGroup: FormGroup;
  dataSource: any;
  headers: any[] = [];

  constructor
  (
    public dialogRef: MatDialogRef<GenerateMatchBracketDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private alertsService: AlertsService
  ){
    this.headers = [
      '#',
      'athlete',
    ];

  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.data.athlete)

    this.formGroup = this.formBuilder.group({
      quadrilateral: ['', Validators.required],
      type_bracket: ['', Validators.required],
      athlete: [this.data.athlete],
      event_id: this.data.event_id,
      entry_category_id: this.data.entry_category_id,
      match_timer: ['', Validators.required]
    });
  }

  onSubmit(){
    this.apiService.postData('matchbracket/generate', this.formGroup.value)
    .subscribe({
      next:(res:any) => {
        console.log(res)
      },
      error:(error) => {
        console.log(error)
        this.alertsService.showAlert("Error!", error.statusText, 'error')
      },
      complete: () => {
        this.dialogRef.close({ event: "success" })
      }
    });

    

  }
}
