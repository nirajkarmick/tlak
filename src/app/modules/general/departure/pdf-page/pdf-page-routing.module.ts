import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PdfPageComponent} from "./pdf-page.component";

const routes: Routes = [
  {path: '', component: PdfPageComponent, data: {package_id: ''}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PdfPageRoutingModule {
}
