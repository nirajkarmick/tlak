import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartureSidebarRoutingModule } from './departure-sidebar-routing.module';
import { DepartureSidebarComponent } from './departure-sidebar.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
      declarations: [DepartureSidebarModule.rootComponent],
      imports: [CommonModule,DepartureSidebarRoutingModule, TranslateModule],
      exports: [DepartureSidebarModule.rootComponent],
      entryComponents: [DepartureSidebarModule.rootComponent], 
})
export class DepartureSidebarModule { 

      static rootComponent = DepartureSidebarComponent
}
