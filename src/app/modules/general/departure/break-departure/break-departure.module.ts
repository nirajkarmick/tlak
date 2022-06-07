import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { BreakDepartureRoutingModule } from './break-departure-routing.module';
import { BreakDepartureComponent } from './break-departure.component';
import { DepartureSidebarModule } from '../departure-sidebar/departure-sidebar.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";


@NgModule({
  declarations: [
    BreakDepartureComponent
  ],
  imports: [
    CommonModule,
    BreakDepartureRoutingModule,
    DepartureSidebarModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ]
})
export class BreakDepartureModule { }
