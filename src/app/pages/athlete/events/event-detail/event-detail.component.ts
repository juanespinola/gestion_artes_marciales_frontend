import { Component } from '@angular/core';
import { MaterialModule } from '../../../admin/components/material.module';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../../utils/api.service';
import { APP_ROUTES } from '../../../../routes';
import { SessionService } from '../../../../services/session.service';
import { EventListAthleteInscriptionComponent } from '../event-list-athlete-inscription/event-list-athlete-inscription.component';
import { EventBracketComponent } from '../event-bracket/event-bracket.component';
import { EventSchedulesComponent } from '../event-schedules/event-schedules.component';
import { BracketsManager } from 'brackets-manager';


@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [
    MaterialModule,
    EventListAthleteInscriptionComponent,
    EventBracketComponent,
    EventSchedulesComponent
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
    private sessionService: SessionService,
    
  ) {

    this.event_id = this.activatedRoute.snapshot.paramMap.get('event_id')
    this.athlete = this.sessionService.getUser()
    
  
  }

  ngOnInit() {  
    this.getEvent()
  }

  getEvent(){
    this.apiService.getData(`events/${this.event_id}/eventdetail`)
    .subscribe({
      next: (res:any) => {
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
    this.router.navigate(["event", this.event_id,APP_ROUTES.ATHLETE_REGISTER_EVENT]);
  }


  // window.bracketsViewer.render({
  //   stages: data.stage,
  //   matches: data.match,
  //   matchGames: data.match_game,
  //   participants: data.participant,
  // });
}
