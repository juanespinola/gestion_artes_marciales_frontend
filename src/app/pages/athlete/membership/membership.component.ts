import { Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../../admin/components/material.module';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../../../utils/api.service';
import { Router } from '@angular/router';
import { AlertsService } from '../../../services/alerts.service';
import { SessionService } from '../../../services/session.service';
import { PaymentComponent } from '../payment/payment.component';
import { MatDialog } from '@angular/material/dialog';

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
  dataSourcePayment: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private apiService: ApiService,
    private route: Router,
    private alertsService: AlertsService, 
    private sessionService: SessionService,
    private dialog: MatDialog
    ){
    this.collection = "athlete/getathletemembershipfee"
    this.headers = ["#","description", "end_date_fee", "amount_fee",'status', "actions"];
    
    this.athlete = this.sessionService.getUser();
  }

  ngAfterViewInit() {
    this.getAll()
    this.getAthleteMembershipfeePayment()
  }

  getAll() {
    this.apiService.postData(this.collection, {
      athlete_id: this.athlete.id,
      federation_id: this.athlete.federation.id,
      association_id: this.athlete.federation.association.id,
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

  checkout(id:any){
    this.route.navigate(['checkout'], {state : {
      membership_id: id
    } });
    // this.apiService.putData(this.collection, id, {
      
    // })
    // .subscribe({
    //   next:(res:any) => {
    //     console.log(res)
    //   },
    //   error:(error:any) => {
    //     console.log(error)
    //     this.alertsService.showAlert("Error!", error.statusText, 'error')
    //   }
    // });

    // const dialogRef = this.dialog.open(PaymentComponent, {
    //   data: {
        
    //   },
    //   height: "80%",
    //   width: "80%",
    // })
    // dialogRef.afterClosed()
    //   .subscribe((result: any) => {
        
    //   })

    
  }


  getAthleteMembershipfeePayment(){
    this.apiService.postData("athlete/getathletemembershipfeepayment", {
      athlete_id: this.athlete.id,
      federation_id: this.athlete.federation.id,
      association_id: this.athlete.federation.association.id,
    })
    .subscribe({
      next:(res:any) => {
        // console.log(res)
        this.dataSourcePayment = new MatTableDataSource(res)
        this.dataSourcePayment.sort = this.sort;
        this.dataSourcePayment.paginator = this.paginator;
      },
      error:(error:any) => {
        console.log(error)
        this.alertsService.showAlert("Error!", error.statusText, 'error')
      }
    });
  }

  paymentDetail(id:any){

  }
}
