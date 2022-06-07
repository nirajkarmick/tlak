import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartureTableComponent } from './departure-table.component'

const routes: Routes = [
  { path: '', component: DepartureTableComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartureTableRoutingModule { }
