import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../component/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../../utils/api.service';
import { AlertsService } from '../../../../services/alerts.service';

@Component({
  selector: 'app-request-membership-dialog',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './request-membership-dialog.component.html',
  styleUrl: './request-membership-dialog.component.scss'
})
export class RequestMembershipDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<RequestMembershipDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService,
    private alertsService:AlertsService
  ) {

  }


  onSubmit(){
    
    this.apiService.postData('requestautorization', this.data)
    .subscribe( (res:any) => {
      if(res.data == 'membresia_activa'){
        this.alertsService.showAlert("Atención!", res.messages, 'warning')
      } else {
        this.alertsService.showAlert("Correcto!", "Solicitud Generada Correctamente", 'success')
      }
    });

    this.dialogRef.close({
      event: "success"
    })

  }
}
