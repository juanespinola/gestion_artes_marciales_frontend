import { Component } from '@angular/core';
import { MaterialModule } from '../../../../components/material.module';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../../utils/api.service';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [
    MaterialModule,
  ],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.scss'
})
export class EventDetailComponent {
  
  event_id: any;
  event: any;
  constructor( 
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private apiService: ApiService) {

    this.event_id = this.activatedRoute.snapshot.paramMap.get('event_id')
  }

  ngOnInit() {  
    this.getEvent()
  }

  getEvent(){
    this.apiService.getData(`events/${this.event_id}/eventdetail`)
    .subscribe({
      next: (res:any) => {
        console.log(res)
        this.event = res;        
      },
      error: (err) => console.log(err),
      complete: () => {}
    });
  }

}
