import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin.component';
import { SigninRoutingModule } from './signin-routing.module';
import { LoginService } from '../../../services/login.service';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SigninRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    SigninComponent
  ],
  declarations: [
    SigninComponent
  ],
  providers: [LoginService
  ],
})
export class SigninModule { }