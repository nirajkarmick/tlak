import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InclusionExclusionComponent } from './inclusion-exclusion.component'

const routes: Routes = [
  { path: '', component: InclusionExclusionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InclusionExclusionRoutingModule { }
