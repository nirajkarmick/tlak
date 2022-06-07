import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillingRoutingModule } from './billing-routing.module';
import { BillingComponent } from './billing.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    BillingComponent
  ],
  imports: [
    CommonModule,
    BillingRoutingModule,
    TranslateModule
  ]
})
export class BillingModule { }
