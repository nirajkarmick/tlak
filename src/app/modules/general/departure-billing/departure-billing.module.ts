import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartureBillingRoutingModule } from './departure-billing-routing.module';
import { DepartureBillingComponent } from './departure-billing.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    DepartureBillingComponent
  ],
    imports: [
        CommonModule,
        DepartureBillingRoutingModule,
        ReactiveFormsModule
    ]
})
export class DepartureBillingModule { }
