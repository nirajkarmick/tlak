import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { TermsAndConditionsRoutingModule } from './terms-and-conditions-routing.module';
import { TermsAndConditionsComponent } from './terms-and-conditions.component';
import { DepartureSidebarModule } from "../departure-sidebar/departure-sidebar.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AngularEditorModule} from "@kolkov/angular-editor";


@NgModule({
  declarations: [
    TermsAndConditionsComponent
  ],
  imports: [
    CommonModule,
    TermsAndConditionsRoutingModule,
    DepartureSidebarModule,
    ReactiveFormsModule,
    TranslateModule,
    AngularEditorModule,
    FormsModule
  ]
})
export class TermsAndConditionsModule { }
