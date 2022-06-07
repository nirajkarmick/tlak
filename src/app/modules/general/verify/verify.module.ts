import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { VerifyRoutingModule } from './verify-routing.module';
import { VerifyComponent } from './verify.component';


@NgModule({
  declarations: [
    VerifyComponent
  ],
  imports: [
    CommonModule,
    VerifyRoutingModule,
    TranslateModule
  ]
})
export class VerifyModule { }
