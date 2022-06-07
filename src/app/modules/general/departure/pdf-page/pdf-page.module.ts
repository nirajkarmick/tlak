import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { PdfPageRoutingModule } from './pdf-page-routing.module';
import { PdfPageComponent } from './pdf-page.component';
import { DepartureSidebarModule } from "../departure-sidebar/departure-sidebar.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    PdfPageComponent
  ],
  imports: [
    CommonModule,
    PdfPageRoutingModule,
    DepartureSidebarModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    TranslateModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PdfPageModule {
}

