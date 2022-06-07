import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCreditComponent } from './add-credit.component';

const routes: Routes = [
  { path: '', component: AddCreditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddCreditRoutingModule { }
