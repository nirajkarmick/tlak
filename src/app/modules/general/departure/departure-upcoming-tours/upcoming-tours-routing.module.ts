import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpcomingToursComponent } from './upcoming-tours.component';

const routes: Routes = [
  {path: '', component: UpcomingToursComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpcomingToursRoutingModule { }
