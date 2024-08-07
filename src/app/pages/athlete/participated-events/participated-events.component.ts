import { Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../component/material.module';
import { ApiService } from '../../../utils/api.service';
import { SessionService } from '../../../services/session.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AlertsService } from '../../../services/alerts.service';

@Component({
  selector: 'app-participated-events',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './participated-events.component.html',
  styleUrl: './participated-events.component.scss'
})
export class ParticipatedEventsComponent {

  athlete:any;
  dataSource: any;
  headers: any[] = [];
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private apiService: ApiService, 
    private sessionService: SessionService,
    private alertsService: AlertsService
  ){
    this.headers = ["#", "description", "actions"];
    this.athlete = this.sessionService.getUser();
  }
  
  ngOnInit(){
    this.getAthleteInscriptionPayment()
  }

  getAthleteInscriptionPayment(){
    this.apiService.postData("athlete/getathleteparticipatedevent", {
      athlete_id: this.athlete.id,
    })
    .subscribe({
      next:(res:any) => {
        // console.log(res)
        this.dataSource = new MatTableDataSource(res)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error:(error:any) => {
        console.log(error)
        this.alertsService.showAlert("Error!", error.statusText, 'error')
      }
    });
  }

  detail(id:any){

  }
}
