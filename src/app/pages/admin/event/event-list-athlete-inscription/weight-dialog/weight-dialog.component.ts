import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../../components/material.module';
import { ApiService } from '../../../../../utils/api.service';

@Component({
  selector: 'app-weight-dialog',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './weight-dialog.component.html',
  styleUrl: './weight-dialog.component.scss'
})
export class WeightDialogComponent {
  
  event_weight: number = 0;

  constructor
  (
    public dialogRef: MatDialogRef<WeightDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService
  ){
  }
  onSubmit(){
    this.apiService.putData('inscription', this.data.inscription_id, {
      event_weight: this.event_weight
    })
    .subscribe( (res:any) => {
         
    });

    this.dialogRef.close({
      event: "success"
    })

  }
}
