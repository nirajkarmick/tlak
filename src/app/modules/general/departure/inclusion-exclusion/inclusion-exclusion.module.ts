import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { InclusionExclusionRoutingModule } from './inclusion-exclusion-routing.module';
import { InclusionExclusionComponent } from './inclusion-exclusion.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DepartureSidebarModule } from '../departure-sidebar/departure-sidebar.module';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from "@ng-select/ng-select";


@NgModule({
  declarations: [
    InclusionExclusionComponent
  ],
  imports: [
    CommonModule,
    InclusionExclusionRoutingModule,
    DepartureSidebarModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgSelectModule,
    TranslateModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class InclusionExclusionModule {
}
