import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TravellersComponent } from './travellers.component'

const routes: Routes = [{ path: '', component: TravellersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TravellersRoutingModule { }
