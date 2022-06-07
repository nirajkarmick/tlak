import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PaymentDetailsComponent} from "./payment-details.component";

const routes: Routes = [
  { path: '', component: PaymentDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentDetailsRoutingModule { }
