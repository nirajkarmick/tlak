import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../services/api.service';
import {Router, ParamMap, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  credentials = {email: "",};
  forgetMail: FormGroup
  isSubmitted = false;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private ReactiveFormsModule: ReactiveFormsModule,
    private toastr: ToastrService,
  ) {
    this.forgetMail = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    })
  }

  ngOnInit(): void {
  }

  get form() {
    return this.forgetMail.controls;
  };

  resetEmail() {
    this.isSubmitted = true;
    if (this.forgetMail.invalid) {
      return
    } else {
      this.apiService.forgetPass(this.forgetMail.value).subscribe( // api post
        (obj: any) => {
          console.log(obj)
          this.forgetMail.reset();
          this.isSubmitted = false;
          if (obj.success) {
            this.toastr.success(obj.success);
          }
          if (obj.error) {
            this.toastr.error(obj.error);
          }
        },
        (error) => {
          this.toastr.error("Oops! We couldn't find matching credentials")
        }
      );
    }
  }

}
