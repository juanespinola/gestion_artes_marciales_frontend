import { Component, Inject, Input } from '@angular/core';
import { MaterialModule } from '../../../admin/components/material.module';
import { ApiService } from '../../../../utils/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EventMatchbracketDetailComponent } from '../event-matchbracket-detail/event-matchbracket-detail.component';

@Component({
  selector: 'app-event-bracket',
  standalone: true,
  imports: [
    MaterialModule,
  ],
  templateUrl: './event-bracket.component.html',
  styleUrl: './event-bracket.component.scss'
})
export class EventBracketComponent {
  
  brackets: any = [];
  groupbrackets: any = [];
  event_id: any;

  @Input() entry_category_id: any;

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public dialogRef: MatDialogRef<EventBracketComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog
  ){
    this.event_id = this.data.event_id
    this.getGroupBrackets()
    this.getMatchBrackets()    
  }

  ngOnInit() {
    console.log(this.data)
  }


  getMatchBrackets(){
    this.apiService.postData(`events/${this.event_id}/matchbrackets`, {
      entry_category_id: this.data.entry_category_id
    })
    .subscribe({
      next: (res:any) => {
        // console.log(res)
        this.brackets = res;        
      },
      error: (err) => console.log(err),
      complete: () => {}
    });
  }

  getGroupBrackets(){
    this.apiService.postData(`events/${this.event_id}/groupbrackets`, {
      entry_category_id: this.data.entry_category_id
    })
    .subscribe({
      next: (res:any) => {
        console.log(res)
        this.groupbrackets = res;        
      },
      error: (err) => console.log(err),
      complete: () => {}
    });
  }

  detailMatchBracket(matchbrackets:any){
    const dialogRef = this.dialog.open(EventMatchbracketDetailComponent, {
      data: {
        matchbrackets
      },
      height: "80%",
      width: "60%"
    });
    
    dialogRef.afterClosed()
      .subscribe((result: any) => {
        // if (result.event == 'success') {
        //   this.getAll();
        // }
      }) 
  }

}
