import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { LoginService } from '../../../services/login.service';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTooltipModule} from "@angular/material/tooltip";


@NgModule({
  declarations: [
    RegisterComponent
  ],
    imports: [
        CommonModule,
        RegisterRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatTooltipModule,
    ],
  exports: [
    RegisterComponent
  ],
  providers: [LoginService
  ],
})
export class RegisterModule { }
