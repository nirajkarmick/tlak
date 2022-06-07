import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartureLocationComponent } from './departure-location.component';


const routes: Routes = [
  { path: '', component: DepartureLocationComponent ,data:{package_id:''} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartureLocationRoutingModule { }
