import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './header.component';
import { HeaderRoutingModule } from './header-routing.module';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
//  declarations: [HeaderComponent],
//  exports: [HeaderComponent],
  imports: [CommonModule,
     RouterModule,
     TranslateModule],
})
export class HeaderModule { }
