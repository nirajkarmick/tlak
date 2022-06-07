import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { OperationsTeamRoutingModule } from './operations-team-routing.module';
import { DepartureSidebarModule } from '../departure-sidebar/departure-sidebar.module';
import { OperationsTeamComponent } from './operations-team.component';
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    OperationsTeamComponent
  ],
  imports: [
    CommonModule,
    OperationsTeamRoutingModule,
    DepartureSidebarModule,
    ReactiveFormsModule,
    TranslateModule
  ]
})
export class OperationsTeamModule { }
