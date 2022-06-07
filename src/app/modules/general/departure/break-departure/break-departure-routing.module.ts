import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BreakDepartureComponent} from "../break-departure/break-departure.component";

const routes: Routes = [
  { path: '', component: BreakDepartureComponent, data:{package_id:''} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BreakDepartureRoutingModule { }
