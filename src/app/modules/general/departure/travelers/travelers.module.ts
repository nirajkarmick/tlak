import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { TravelersRoutingModule } from './travelers-routing.module';
import { TravelersComponent } from './travelers.component';
import { DepartureSidebarModule } from '../departure-sidebar/departure-sidebar.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    TravelersComponent
  ],
  imports: [
    CommonModule,
    TravelersRoutingModule,
    DepartureSidebarModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    TranslateModule
  ]
})
export class TravelersModule {
}
