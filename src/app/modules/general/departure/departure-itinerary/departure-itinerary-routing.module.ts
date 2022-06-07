import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartureItineraryComponent } from './departure-itinerary.component'

const routes: Routes = [
  { path: '', component: DepartureItineraryComponent, data:{package_id:''} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartureItineraryRoutingModule { }
