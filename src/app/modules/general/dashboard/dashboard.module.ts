import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DashboardRoutingModule } from './dashboard-routing.module'; 
import { DashboardComponent } from './dashboard.component'; 
import { ApiService } from '../../../services/api.service';
import { FormsModule, ReactiveFormsModule} from '@angular/forms'; 
import { AgmCoreModule } from "@agm/core";
import { MatTooltipModule } from "@angular/material/tooltip";
// import { GoogleChartComponent } from 'angular-google-charts';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule, 
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule,
    TranslateModule,
    MatTooltipModule
    // GoogleChartComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  exports: [
    DashboardComponent
  ],
  providers: [ApiService
  ],
})
export class DashboardModule { } 
