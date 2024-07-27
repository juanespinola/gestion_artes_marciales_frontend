import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../../utils/api.service';
import { MaterialModule } from '../../component/material.module';

@Component({
  selector: 'app-belt-history-detail-dialog',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './belt-history-detail-dialog.component.html',
  styleUrl: './belt-history-detail-dialog.component.scss'
})
export class BeltHistoryDetailDialogComponent {
  belthistory:any = {}
  constructor(
    public dialogRef: MatDialogRef<BeltHistoryDetailDialogComponent>, 
    public apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.belthistory = this.data.belthistory
    console.log(this.belthistory)
  }
  
}
