import { Component } from '@angular/core';
import { MaterialModule } from '../component/material.module';
import { ApiService } from '../../../utils/api.service';


@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.scss'
})
export class RankingComponent {

  athleteRanking: any;
  pastevents:any; 
  federation_id:any;
  event_id:any

  constructor(private apiService: ApiService){
    this.federation_id = history.state?.federation_id
  }
  ngOnInit(){
    this.getEvents()
    // this.getRanking()
  }

  getRanking(event_id:any) {
    this.apiService.postData('getAthleteRanking', {
      event_id // queda hacer un select de los ultimos 5 eventos
    })
    .subscribe({
      next: (res:any) => {
        this.athleteRanking = res
      },
      error: (err) => console.log(err),
      complete: () => {}
    });
  }


  getEvents(){
    this.apiService.getData(`pastevents/${this.federation_id}`)
    .subscribe({
      next: (res:any) => {
        this.pastevents = res
      },
      error: (err) => console.log(err),
      complete: () => {}
    });
  }

}
