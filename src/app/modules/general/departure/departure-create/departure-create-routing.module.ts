import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartureCreateComponent } from './departure-create.component'

const routes: Routes = [
  { path: '', component: DepartureCreateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartureCreateRoutingModule { }
