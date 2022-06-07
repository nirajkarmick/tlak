import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartureSettingsComponent } from './departure-settings.component'

const routes: Routes = [
  { path: '', component: DepartureSettingsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartureSettingsRoutingModule { }
