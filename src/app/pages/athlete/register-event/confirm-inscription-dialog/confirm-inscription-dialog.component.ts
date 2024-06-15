import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../component/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-inscription-dialog',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './confirm-inscription-dialog.component.html',
  styleUrl: './confirm-inscription-dialog.component.scss'
})
export class ConfirmInscriptionDialogComponent {

  constructor(public dialogRef: MatDialogRef<ConfirmInscriptionDialogComponent>){

  }
  onSubmit(){
    this.dialogRef.close({
      event: "confirm"
    })
  }

}
