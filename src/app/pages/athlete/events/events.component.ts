import { Component } from '@angular/core';
import { MaterialModule } from '../../admin/components/material.module';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../utils/api.service';

import moment from 'moment';
import { SessionService } from '../../../services/session.service';
import { HeaderComponent } from '../component/header/header.component';


@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    MaterialModule,
    HeaderComponent,
  ],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent {
  federation_id: any;
  federation: any;
  athlete: any;
  events: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private sessionService: SessionService
  ){
    
    this.federation_id = history.state?.federation_id
    // this.athlete = history.state?.athlete


  }

  ngOnInit() {
  
    this.athlete = this.sessionService.getUser()

    this.getFederation()
    this.getEvents()
  }

  getFederation(){
    this.apiService.getData(`federations/${this.federation_id}`)
    .subscribe({
      next: (res:any) => {
        this.federation = res
      },
      error: (err) => console.log(err),
      complete: () => {}
    });
  }

  getEvents(){
    this.apiService.getData(`federations/${this.federation_id}/events`)
    .subscribe({
      next: (res:any) => {
        console.log(res)
        this.events = res;        
      },
      error: (err) => console.log(err),
      complete: () => {}
    });
  }

  comingEvent(dateEvent: any) : any {
    return moment().diff(dateEvent, 'day')
  }

  selectEvent(event_id:any) {
    this.router.navigate(['event', event_id], {state: { federation_id: this.federation_id, athlete: this.athlete }})
  }



}
