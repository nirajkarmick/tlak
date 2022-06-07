import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Router, ParamMap ,ActivatedRoute} from '@angular/router'; 
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from  '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TranslateConfigService } from "../../../services/translate-config.service";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  emaildata: any
  credentials = {email: "", password: "", password_confirmation: ""};
  resetPassWord: FormGroup
  isSubmitted = false;
  token:any;
  email:any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService, 
    private formBuilder: FormBuilder,
    private ReactiveFormsModule: ReactiveFormsModule,
    private toastr: ToastrService,
    private translate: TranslateConfigService
  ) { 
    this.token = this.route.snapshot.params['token'];
    this.email = this.route.snapshot.queryParams['email'];
    //alert(this.email)
    this.resetPassWord = this.formBuilder.group({
      email: [this.email, [Validators.required]],
      password: ['', [Validators.required]],
      password_confirmation: ['', [Validators.required]] 
    }, 
    { 
      validator: this.ConfirmedValidator('password', 'password_confirmation')
    }
     )
    // this.getEmail();
  };

  ngOnInit(): void {
  }

  

  ConfirmedValidator(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmedValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}
  // getEmail() {
  //   this.apiService.email(this.token).subscribe(
  //     (obj:any) => {
  //       this.emaildata = obj.data;
  //       this.resetPassWord.patchValue({
  //         email: this.emaildata,
  //       });
  //     }
  //   )
  // }

  get form() {
    return this.resetPassWord.controls;
  };

  updatePass() {
    this.isSubmitted = true;
    console.log(this.resetPassWord.value)
    if (this.resetPassWord.invalid) {
      return
    } else {
      this.apiService.resetPass(this.resetPassWord.value, this.token).subscribe(
        (obj: any) => {
          if( obj.status === true) {
            this.toastr.success(obj.message);
            this.router.navigateByUrl('/');
          } else if ( obj.status === false ) {
            this.toastr.error(obj.message);
          } 
        } ,
        (error) => {
          this.toastr.error("server error");
        }
      );
     }
      
  }

}
