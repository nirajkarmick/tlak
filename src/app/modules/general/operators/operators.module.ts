import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { OperatorsRoutingModule } from './operators-routing.module';
import { OperatorsComponent } from './operators.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    OperatorsComponent
  ],
  imports: [
    CommonModule,
    OperatorsRoutingModule,
    FormsModule,
    TranslateModule
  ]
})
export class OperatorsModule { }
