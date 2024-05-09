import { Component } from '@angular/core';
import { MaterialModule } from '../../../components/material.module';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../utils/api.service';
import { HeaderComponent } from '../components/header/header.component';
import moment from 'moment';



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

  events: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ){
    // this.federation_id = this.activatedRoute.snapshot.paramMap.get('federation_id')
    this.federation_id = history.state?.federation_id
    console.log(history.state)
  }

  ngOnInit() {
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
    this.router.navigate(['event', event_id], {state: { federation_id: this.federation_id }})
  }



}
