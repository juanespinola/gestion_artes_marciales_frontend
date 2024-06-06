import { Component } from '@angular/core';
import { MaterialModule } from '../../../admin/components/material.module';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../../utils/api.service';
import { APP_ROUTES } from '../../../../routes';
import { SessionService } from '../../../../services/session.service';

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
  athlete: any;

  constructor( 
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private sessionService: SessionService
  ) {

    this.event_id = this.activatedRoute.snapshot.paramMap.get('event_id')
    this.athlete = this.sessionService.getUser()
    
    console.log(this.athlete)
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

  navigateAthleteLogin(){
    this.router.navigate([APP_ROUTES.ATHLETE_SIGNIN])
  }

  navigateEventRegister(){
    this.router.navigate(["event",this.event_id,APP_ROUTES.ATHLETE_REGISTER_EVENT]);
  }

}
