import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperationsTeamComponent } from './operations-team.component'

const routes: Routes = [
  {path: '', component: OperationsTeamComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationsTeamRoutingModule { }
