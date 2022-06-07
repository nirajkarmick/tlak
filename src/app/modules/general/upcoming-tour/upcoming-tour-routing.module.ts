import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpcomingTourComponent } from './upcoming-tour.component'

const routes: Routes = [
  { path: '', component: UpcomingTourComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpcomingTourRoutingModule { }
