import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentDetailsRoutingModule } from './payment-details-routing.module';
import { PaymentDetailsComponent } from './payment-details.component';


@NgModule({
  declarations: [
    PaymentDetailsComponent
  ],
  imports: [
    CommonModule,
    PaymentDetailsRoutingModule
  ]
})
export class PaymentDetailsModule { }
