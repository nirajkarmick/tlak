import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TravellersRoutingModule } from './travellers-routing.module';
import { TravellersComponent } from './travellers.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    TravellersComponent
  ],
  imports: [
    CommonModule,
    TravellersRoutingModule,
    TranslateModule
  ]
})
export class TravellersModule { }
