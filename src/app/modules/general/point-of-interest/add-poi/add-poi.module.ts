import { NgModule, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AddPoiRoutingModule } from './add-poi-routing.module';
import { AddPoiComponent } from './add-poi.component';
import { AgmCoreModule } from "@agm/core";
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { FormsModule } from "@angular/forms";
import { NgSelectModule } from '@ng-select/ng-select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    AddPoiComponent
  ],
  imports: [
    CommonModule,
    AddPoiRoutingModule,
    AgmCoreModule,
    HttpClientModule,
    HttpClientJsonpModule,
    FormsModule,
    NgSelectModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    TranslateModule
  ]
})
export class AddPoiModule {
}
