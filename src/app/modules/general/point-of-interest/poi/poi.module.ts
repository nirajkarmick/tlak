import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { PoiRoutingModule } from './poi-routing.module';
import { PoiComponent } from './poi.component';
import { ApiService } from '../../../../services/api.service';



@NgModule({
  declarations: [
    PoiComponent
  ],
  imports: [
    CommonModule,
    PoiRoutingModule,
    TranslateModule
  ],
  providers: [ApiService
  ],
})
export class PoiModule { }
