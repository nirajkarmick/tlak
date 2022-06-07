import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UpcomingTourRoutingModule } from './upcoming-tour-routing.module';
import { UpcomingTourComponent } from './upcoming-tour.component';
import { FormsModule } from "@angular/forms";
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    UpcomingTourComponent
  ],
  imports: [
    CommonModule,
    UpcomingTourRoutingModule,
    HttpClientModule,
    FormsModule,
    TranslateModule
  ]
})

export class UpcomingTourModule { }
