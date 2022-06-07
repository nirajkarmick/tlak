import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TravellersListComponent } from './travellers-list.component';

const routes: Routes = [{ path: '', component: TravellersListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TravellersListRoutingModule { }
