import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TravellersListRoutingModule } from './travellers-list-routing.module';
import { TravellersListComponent } from './travellers-list.component';
import { FormsModule } from "@angular/forms";
import { TranslateModule } from '@ngx-translate/core';
import {MatTooltipModule} from "@angular/material/tooltip";

@NgModule({
  declarations: [
    TravellersListComponent
  ],
  imports: [
    CommonModule,
    TravellersListRoutingModule,
    FormsModule,
    TranslateModule,
    MatTooltipModule
  ]
})
export class TravellersListModule { }
