import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DepartureTableRoutingModule} from './departure-table-routing.module';
import {DepartureTableComponent} from './departure-table.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import {TranslateModule} from '@ngx-translate/core';
import {ImageCropperModule} from "ngx-image-cropper";
//import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';

@NgModule({
  declarations: [
    DepartureTableComponent
  ],
  imports: [
    CommonModule,
    DepartureTableRoutingModule,
    MatDatepickerModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    TranslateModule,
    ImageCropperModule
  ],
})
export class DepartureTableModule {
}
