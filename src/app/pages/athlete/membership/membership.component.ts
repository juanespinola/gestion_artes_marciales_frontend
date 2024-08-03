import { Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../../admin/components/material.module';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../../../utils/api.service';
import { Router } from '@angular/router';
import { AlertsService } from '../../../services/alerts.service';
import { SessionService } from '../../../services/session.service';

@Component({
  selector: 'app-membership',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './membership.component.html',
  styleUrl: './membership.component.scss'
})
export class MembershipComponent {
  collection = 'users';
  headers: any[] = [];
  columns: any[] = [];
  filters: any[] = [];
  athlete:any;
  elements:any;
  dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private apiService: ApiService,
    private route: Router,
    private alertsService: AlertsService, 
    private sessionService: SessionService
    ){
    this.collection = "athlete/getathletemembershipfee"
    this.headers = ["#","description", "end_date_fee", "amount_fee",'status', "actions"];
    
    this.athlete = this.sessionService.getUser();
    console.log(this.athlete)
  }

  ngAfterViewInit() {
    this.getAll()
  }

  getAll() {
    this.apiService.postData(this.collection, {
      athlete_id: this.athlete.id,
      federation_id: this.athlete.federation.id,
      association_id: this.athlete.federation.association.id,
    })
    .subscribe({
      next:(res:any) => {
        console.log(res)
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
}
