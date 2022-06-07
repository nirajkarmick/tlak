import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PdfcreateRoutingModule } from './pdfcreate-routing.module';
import { PdfcreateComponent } from './pdfcreate.component';
import { DepartureSidebarModule } from "../../departure-sidebar/departure-sidebar.module";
import { TranslateModule } from '@ngx-translate/core';
import {AngularEditorModule} from "@kolkov/angular-editor";


@NgModule({
  declarations: [
    PdfcreateComponent
  ],
    imports: [
        CommonModule,
        PdfcreateRoutingModule,
        DepartureSidebarModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        AngularEditorModule
    ],
})
export class PdfcreateModule { }
