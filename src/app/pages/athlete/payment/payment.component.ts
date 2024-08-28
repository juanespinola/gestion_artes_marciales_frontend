import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../admin/components/material.module';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule
  ],
  templateUrl: './payment.component.html',
  // template: '<div id="iframe-container"></div>',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {
  process_id: string = '';
  window:any = window
  response_bancard: any ;

  response_payment: any

  constructor(){
    this.response_bancard = history?.state.response_bancard;

    console.log(this.response_bancard)
  }

  ngOnInit(): void {
    
    if (this.window.Bancard && this.window.Bancard.Checkout) {
      if(this.response_bancard?.process_id){
        this.window.Bancard.Checkout.createForm('iframe-container', this.response_bancard.process_id, { })
      } else if (this.response_bancard?.data_error){
        this.response_payment = this.response_bancard.data_error 
      }
    } else {
      console.error('Bancard Checkout library is not loaded');
    }

    if(!this.response_bancard){
      this.response_payment = "Transferencia Realizada, estaremos confirmando tu Pago! Muchas gracias";
    }

  }

  // ngAfterViewInit() {
  // }
}
