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

  response_payment: string= ''

  constructor(){
    this.response_bancard = history.state.response_bancard;

    
  }

  ngAfterViewInit() {
    this.process_id = this.response_bancard.process_id
    if (this.window.Bancard && this.window.Bancard.Checkout) {
      if(this.process_id){
        this.window.Bancard.Checkout.createForm('iframe-container', this.process_id, { })
      }
    } else {
      console.error('Bancard Checkout library is not loaded');
    }

    if(!this.process_id){
      this.response_payment = "Transferencia Realizada, estaremos confirmando tu Pago! Muchas gracias";
      
      
    }
  }
}
