import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from '@ngx-translate/core';
import { TourDocumentsRoutingModule } from './tour-documents-routing.module';
import { TourDocumentsComponent } from './tour-documents.component';
import { DepartureSidebarModule } from '../departure-sidebar/departure-sidebar.module';


@NgModule({
  declarations: [
    TourDocumentsComponent
  ],
  imports: [
    CommonModule,
    TourDocumentsRoutingModule,
    DepartureSidebarModule,
    ReactiveFormsModule,
    TranslateModule
  ]
})
export class TourDocumentsModule {
}
