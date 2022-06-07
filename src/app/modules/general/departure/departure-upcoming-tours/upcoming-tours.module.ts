import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { UpcomingToursRoutingModule } from './upcoming-tours-routing.module';
import { UpcomingToursComponent } from './upcoming-tours.component';
import { DepartureSidebarModule } from '../departure-sidebar/departure-sidebar.module';
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    UpcomingToursComponent
  ],
  imports: [
    CommonModule,
    UpcomingToursRoutingModule,
    DepartureSidebarModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class UpcomingToursModule { }
