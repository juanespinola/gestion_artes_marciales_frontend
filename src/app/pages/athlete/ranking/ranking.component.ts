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
  constructor(private apiService: ApiService){

  }
  ngOnInit(){
    this.getRanking()
  }

  getRanking() {
    this.apiService.postData('getAthleteRanking', {
      event_id: '2' // queda hacer un select de los ultimos 5 eventos
    })
    .subscribe({
      next: (res:any) => {
        this.athleteRanking = res
      },
      error: (err) => console.log(err),
      complete: () => {}
    });
  }

}
