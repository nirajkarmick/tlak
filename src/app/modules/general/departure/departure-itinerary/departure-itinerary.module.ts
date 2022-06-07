import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartureItineraryRoutingModule } from './departure-itinerary-routing.module';
import { DepartureItineraryComponent } from './departure-itinerary.component';
import { DepartureSidebarModule } from '../departure-sidebar/departure-sidebar.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    DepartureItineraryComponent
  ],
  imports: [
    CommonModule,
    DepartureItineraryRoutingModule,
    DepartureSidebarModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ]
})
export class DepartureItineraryModule { }
