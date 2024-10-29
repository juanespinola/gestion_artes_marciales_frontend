import { Component } from '@angular/core';
import { MaterialModule } from '../../component/material.module';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-minor-authorization-dialog',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './minor-authorization-dialog.component.html',
  styleUrl: './minor-authorization-dialog.component.scss'
})
export class MinorAuthorizationDialogComponent {
  
  constructor(public dialogRef: MatDialogRef<MinorAuthorizationDialogComponent> ) {

  }


  onSubmit(){
    this.dialogRef.close({
      event: "success"
    })

  }
}
