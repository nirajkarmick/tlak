import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TranslateConfigService } from "../../../services/translate-config.service";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-chnage-password',
  templateUrl: './chnage-password.component.html',
  styleUrls: ['./chnage-password.component.css']
})
export class ChnagePasswordComponent implements OnInit {
  credentials = { oldPassword: "", password: "", password_confirmation: "" };
  isSubmitted = false;
  emaildata: any;
  resetPassWord: FormGroup;
  token: any;
  isLoading = true;
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
    this.resetPassWord = this.formBuilder.group({
      email: localStorage.getItem('userEmail'),
      current_pwd: ['', [Validators.required]],
      password: ['', [Validators.required]],
      password_confirmation: ['', [Validators.required]]
    },
      {
        validator: this.ConfirmedValidator('password', 'password_confirmation')
      }
    )
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 1400);
  }

  ConfirmedValidator(controlName: string, matchingControlName: string) {
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

  get form() {
    return this.resetPassWord.controls;
  };

  updatePass() {
    this.isLoading = true;
    this.isSubmitted = true;
    if (this.resetPassWord.invalid) {
      return
    } else {
      console.log(this.resetPassWord.value)
      this.apiService.updatePass(this.resetPassWord.value).subscribe(
        (obj: any) => {
          console.log(obj)
          this.isLoading = false;
          this.toastr.success(obj.message);
          setTimeout(() => {
          localStorage.clear();
          this.router.navigateByUrl('/');
          }, 40000);
        },
        (error) => {
          this.toastr.error("database not responding");
        }
      );
    }
  }

}
