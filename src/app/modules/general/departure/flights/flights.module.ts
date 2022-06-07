import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlightsRoutingModule } from './flights-routing.module';
import { FlightsComponent } from './flights.component';
import { DepartureSidebarModule } from '../departure-sidebar/departure-sidebar.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AmazingTimePickerModule } from "amazing-time-picker";
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
//import { NgxSpinnerService } from 'ngx-spinner';


@NgModule({
  declarations: [
    FlightsComponent
  ],
  imports: [
    CommonModule,
    FlightsRoutingModule,
    DepartureSidebarModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    AmazingTimePickerModule,
    NgSelectModule,
    TranslateModule
  //  NgxSpinnerService

  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class FlightsModule {
}
