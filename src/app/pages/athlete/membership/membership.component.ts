import { Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../../admin/components/material.module';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../../../utils/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertsService } from '../../../services/alerts.service';
import { SessionService } from '../../../services/session.service';
import { PaymentComponent } from '../payment/payment.component';
import { MatDialog } from '@angular/material/dialog';
import { RequestMembershipDialogComponent } from './request-membership-dialog/request-membership-dialog.component';


@Component({
  selector: 'app-membership',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './membership.component.html',
  styleUrl: './membership.component.scss'
})
export class MembershipComponent {
  collection:string = '';
  headers: any[] = [];
  headers_inscription: any[] = [];
  columns: any[] = [];
  filters: any[] = [];
  athlete:any;
  elements:any;
  dataSource: any;
  dataSourcePayment: any;
  dataSourceInscriptions: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private apiService: ApiService,
    private route: Router,
    private alertsService: AlertsService, 
    private sessionService: SessionService,
    private activatedRoute: ActivatedRoute,
    private dialog:MatDialog
    ){


    this.collection = "athlete/getathletemembershipfee"
    this.headers = ["#","description", "end_date_fee", "amount_fee",'status', "actions"];
    this.headers_inscription = ["#","description", "amount_fee",'status', "actions"];
    
    this.athlete = this.sessionService.getUser();
    console.log(this.athlete)
  }

  ngAfterViewInit() {

    if(this.activatedRoute.snapshot.queryParams['status']){
      if(this.activatedRoute.snapshot.queryParams['status'] == "payment_fail") {
        this.alertsService.showAlert("Error!", "Pago Rechazado", 'error')
      } else {
        this.alertsService.showAlert("Correcto!", "Pago Confirmado", 'success')
      }
    }

    this.getAll()
    this.getAthleteMembershipfeePayment()
    this.getAthleteInscriptionPayment()
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

  checkout(id:any, payment_for:any){
    if(payment_for == 'membresia'){
      this.route.navigate(['checkout'], {state : {
          membership_id: id
        } 
      });
    } else if(payment_for == 'inscription') {
      this.route.navigate(['checkout'], {state : {
          inscription_id: id
        } 
      });
    }
  }


  getAthleteMembershipfeePayment(){
    this.apiService.postData("athlete/getathletemembershipfeepayment", {
      athlete_id: this.athlete.id,
      federation_id: this.athlete.federation.id,
      association_id: this.athlete.federation.association.id,
    })
    .subscribe({
      next:(res:any) => {
        console.log(res)
      
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

  getAthleteInscriptionPayment(){
    this.apiService.postData("athlete/getathleteinscriptionpayment", {
      athlete_id: this.athlete.id,
    })
    .subscribe({
      next:(res:any) => {
        // console.log(res)
        this.dataSourceInscriptions = new MatTableDataSource(res)
        this.dataSourceInscriptions.sort = this.sort;
        this.dataSourceInscriptions.paginator = this.paginator;
      },
      error:(error:any) => {
        console.log(error)
        this.alertsService.showAlert("Error!", error.statusText, 'error')
      }
    });
  }

  paymentDetail(id:any){

  }


  requestMembership(){
    const dialogRef = this.dialog.open(RequestMembershipDialogComponent, {
      data: {
        'requested_by' : this.athlete.name,
        'date_request': new Date(),
        'request_text': "Solicitud de Membresia",
        'status' : 'pendiente',
        'athlete_id': this.athlete.id,
        'federation_id': this.athlete.federation.id,
        'association_id': this.athlete.federation.association.id,
      }
    })
    dialogRef.afterClosed()
      .subscribe((result: any) => {
        if (result.event == 'success') {
          // this.getAthleteMembershipfeePayment()
        }
      });
  }
}
