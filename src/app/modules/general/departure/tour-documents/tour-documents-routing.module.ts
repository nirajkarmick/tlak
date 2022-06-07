import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TourDocumentsComponent } from './tour-documents.component';

const routes: Routes = [
  {path: '' , component: TourDocumentsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TourDocumentsRoutingModule { }
