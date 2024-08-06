import { Component } from '@angular/core';
import { MaterialModule } from '../component/material.module';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../utils/api.service';
import { AlertsService } from '../../../services/alerts.service';
import { FormsModule } from '@angular/forms';
import { NavigationService } from '../../../services/navigation.service';
import { SessionService } from '../../../services/session.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {

  membership_id: any;
  selectedPaymentMethod: any;

  payment: any = {
    amount_fee: null,
    description: null,
    total: null,
    payment_gateway: null,
    federation_id: null,
    association_id: null,
    membership_id: null,
    payment_for: null,
    total_payment: null,
  };
  athlete: any
  constructor(
    private apiService: ApiService,
    private alertsService: AlertsService,
    private navigationService: NavigationService,
    private sessionService: SessionService,
    private router: Router
  ) {
    this.membership_id = history?.state.membership_id;
    this.athlete = this.sessionService.getUser()
  }

  ngOnInit() {
    this.apiService.getData(`athlete/getmembershipfee/${this.membership_id}`)
      .subscribe({
        next: (res: any) => {
          // console.log(res)
          this.payment = {
            amount_fee: res.amount_fee,
            description: res.description,
            total: res.amount_fee,
          }
        },
        error: (error: any) => {
          console.log(error)
          this.alertsService.showAlert("Error!", error.statusText, 'error')
        }
      });


  }

  onBack() {
    this.navigationService.goBack();
  }

  goToPayment() {
    if (this.selectedPaymentMethod) {

      this.payment = {
        payment_gateway: this.selectedPaymentMethod,
        federation_id: this.athlete.federation.id,
        association_id: this.athlete.federation.association.id,
        membership_id: this.membership_id,
        payment_for: "membresia",
        total_payment: this.payment.total,
      }

      this.apiService.postData("athlete/payment/create", this.payment)
        .subscribe({
          next: (res: any) => {
            console.log(res)
            this.router.navigate(["payment"], { state: { response_bancard: res.data} })
          },
          error: (error: any) => {
            console.log(error)
            this.alertsService.showAlert("Error!", error.statusText, 'error')
          }
        });
    } else {
      this.alertsService.showAlert("Error!", "Seleccione un Método de Pago", 'error')
    }


  }

}
