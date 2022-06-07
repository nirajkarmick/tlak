import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DepartureCreateRoutingModule } from './departure-create-routing.module';
import { DepartureCreateComponent } from './departure-create.component';
import { DepartureSidebarModule } from '../departure-sidebar/departure-sidebar.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgSelectModule } from "@ng-select/ng-select";
import { AmazingTimePickerModule } from "amazing-time-picker";
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ImageCroppedEvent, ImageCropperModule } from "ngx-image-cropper";
//import {NgSelectModule} from '@ng-select/ng-select';



@NgModule({
  declarations: [
    DepartureCreateComponent,
  ],
  imports: [
    CommonModule,
    DepartureCreateRoutingModule,
    DepartureSidebarModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    AmazingTimePickerModule,
    TranslateModule,
    MatButtonModule,
    MatTooltipModule,
    ImageCropperModule,
    //NgSelectModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class DepartureCreateModule { }
