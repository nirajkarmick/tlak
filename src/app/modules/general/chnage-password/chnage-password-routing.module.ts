import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ChnagePasswordComponent} from "./chnage-password.component";

const routes: Routes = [
  {path: '', component: ChnagePasswordComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChnagePasswordRoutingModule {
}
