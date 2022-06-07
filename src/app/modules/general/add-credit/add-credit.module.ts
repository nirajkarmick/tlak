import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AddCreditRoutingModule } from './add-credit-routing.module';
import { AddCreditComponent } from './add-credit.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    AddCreditComponent
  ],
  imports: [
    CommonModule,
    AddCreditRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule
  ]
})
export class AddCreditModule { }
