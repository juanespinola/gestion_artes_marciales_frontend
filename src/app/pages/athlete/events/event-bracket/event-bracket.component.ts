import { Component } from '@angular/core';
import { MaterialModule } from '../../../admin/components/material.module';
import { BracketsManager } from 'brackets-manager';
import { JsonDatabase } from 'brackets-json-db';
import { ApiService } from '../../../../utils/api.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ){
    this.event_id = this.activatedRoute.snapshot.paramMap.get('event_id')
    this.getGroupBrackets()
    this.getMatchBrackets()    
  }

  ngOnInit() {
    
  }


  getMatchBrackets(){
    this.apiService.getData(`events/${this.event_id}/matchbrackets`)
    .subscribe({
      next: (res:any) => {
        console.log(res)
        this.brackets = res;        
      },
      error: (err) => console.log(err),
      complete: () => {}
    });
  }

  getGroupBrackets(){
    this.apiService.getData(`events/${this.event_id}/groupbrackets`)
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
