import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PdfcreateComponent} from "./pdfcreate.component";

const routes: Routes = [
  {path: '', component: PdfcreateComponent, data: {package_id: ''}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PdfcreateRoutingModule { }
