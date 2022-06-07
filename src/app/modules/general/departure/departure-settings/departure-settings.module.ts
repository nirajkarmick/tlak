import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { DepartureSettingsRoutingModule } from './departure-settings-routing.module';
import { DepartureSettingsComponent } from './departure-settings.component';
import { DepartureSidebarModule } from '../departure-sidebar/departure-sidebar.module';
import { FormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    DepartureSettingsComponent
  ],
  imports: [
    CommonModule,
    DepartureSettingsRoutingModule,
    DepartureSidebarModule,
    FormsModule,
    TranslateModule
  ]
})
export class DepartureSettingsModule { }
