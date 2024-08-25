import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../../../utils/api.service';
import { FormBuilder } from '@angular/forms';
import { AlertsService } from '../../../../../services/alerts.service';
import { UpdateMatchBracketDialogComponent } from '../update-match-bracket-dialog/update-match-bracket-dialog.component';
import { MaterialModule } from '../../../components/material.module';

@Component({
  selector: 'app-view-match-bracket-dialog',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './view-match-bracket-dialog.component.html',
  styleUrl: './view-match-bracket-dialog.component.scss'
})
export class ViewMatchBracketDialogComponent {
  collection:string = "matchbracket";
  matchbrackets: any = [];
  constructor(
    public dialogRef: MatDialogRef<ViewMatchBracketDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private alertsService: AlertsService,
    public dialog: MatDialog, 
  ){
    this.getMatchBrackets();
  }


  getMatchBrackets(){
    this.apiService.postData(`${this.collection}`,{
      entry_category_id: this.data.entry_category_id,
      event_id: this.data.event_id,
    })
    .subscribe({
      next:(res:any) => {
        this.matchbrackets = res;
      },
      error:(error) => {
        console.log(error)
        this.alertsService.showAlert("Error!", error.statusText, 'error')
      }
    });
  }


  chargeResult(matchbracket: any){
    
    const dialogRef = this.dialog.open(UpdateMatchBracketDialogComponent, {
      data: {
        matchbracket
      },
      width: "50%",
      height: "50%",
    })
    dialogRef.afterClosed()
      .subscribe((result: any) => {
        if (result.event == 'success') {
          this.getMatchBrackets();
        }
      })
  }


}
