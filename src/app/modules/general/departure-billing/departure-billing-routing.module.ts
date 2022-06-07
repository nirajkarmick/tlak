import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DepartureBillingComponent} from "./departure-billing.component";

const routes: Routes = [
  {path: '', component: DepartureBillingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartureBillingRoutingModule {
}
