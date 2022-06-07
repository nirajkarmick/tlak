import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartureSidebarComponent } from './departure-sidebar.component';

const routes: Routes = [
  { path: '', component: DepartureSidebarComponent,  data:{package_id:''} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepartureSidebarRoutingModule { }
