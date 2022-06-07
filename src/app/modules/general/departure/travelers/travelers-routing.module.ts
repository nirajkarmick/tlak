import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TravelersComponent } from './travelers.component';

const routes: Routes = [
  {path: '', component: TravelersComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TravelersRoutingModule { }
