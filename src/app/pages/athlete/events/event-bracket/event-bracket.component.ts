import { Component, Inject, Input } from '@angular/core';
import { MaterialModule } from '../../../admin/components/material.module';
import { BracketsManager } from 'brackets-manager';
import { JsonDatabase } from 'brackets-json-db';
import { ApiService } from '../../../../utils/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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

}
