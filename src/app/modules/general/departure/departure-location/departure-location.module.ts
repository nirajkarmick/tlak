import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartureLocationRoutingModule } from './departure-location-routing.module';
import { DepartureLocationComponent } from './departure-location.component';
import { DepartureSidebarModule } from '../departure-sidebar/departure-sidebar.module';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
// import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  declarations: [
    DepartureLocationComponent,
  ],
  imports: [
    CommonModule,
    DepartureLocationRoutingModule,
    DepartureSidebarModule,
    FormsModule,
    TranslateModule
    // NgxSkeletonLoaderModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class DepartureLocationModule { }
