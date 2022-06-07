import {Component, OnInit, ChangeDetectorRef} from "@angular/core";
import {Router, ParamMap, ActivatedRoute} from "@angular/router";
import {LoginService} from "../../../services/login.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from 'ngx-toastr';

declare var $: any;

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isLoading = true;
  isSubmitted = false;

  constructor(
    private router: Router,
    private lservice: LoginService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    let that = this;
    setTimeout(function () {
      that.isLoading = false
    }, 2000);
    this.registerForm = this.formBuilder.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      password: ["", Validators.required],
      password_confirmation: ["", Validators.required],
      company_name: ["", Validators.required],
      phone: ["", Validators.required],
      company_id:  ['', [Validators.required , Validators.minLength(3), Validators.maxLength(6)]],
      locality: [""],
      address: ["", Validators.required],
      city: ["", Validators.required],
      postal_code: [""],
      country: ["", Validators.required],
      referred_by: [""],
      hear_about: [""],
      company_website: [""],
    }, { 
      validator: this.ConfirmedValidator('password', 'password_confirmation')
    } );
  }
  //Validators.minLength(6), Validators.maxLength(40)

  get formControls() {
    return this.registerForm.controls;
  }

  ngOnInit(): void {
    if (localStorage.getItem('token') != undefined &&
     localStorage.getItem('token') != null) {
      this.router.navigateByUrl('/dashboard');
    } 

  }

  RegisterResponse: any;

  register() {
    this.isSubmitted = true;
    console.log(this.registerForm.value);
    if (
      this.registerForm.value.address == "" ||
      this.registerForm.value.email == "" ||
      this.registerForm.value.city == "" ||
      this.registerForm.value.country == ""
    ) {
      // alert('Please check form');
      return;
    }
    this.lservice.register(this.registerForm.value).subscribe(
      (obj: any) => {
        console.log(obj);
        // this.RegisterResponse = obj.success;
        // this.toastr.success(obj.success);
        this.isLoading = false;
        if (obj.success) {
          this.toastr.success(obj.success);
          this.router.navigateByUrl("/");
        } else {
          this.toastr.error(obj.error);
        }
      },
      (error) => {
        this.toastr.error('server is not responding');
        this.isLoading = false;
      }
    );
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

  goToNext() {
    this.isSubmitted = true;
    if (
      this.formControls.name.errors ||
      this.formControls.email.errors ||
      this.formControls.password_confirmation.errors ||
      this.formControls.company_name.errors ||
      this.formControls.phone.errors || 
      this.formControls.company_id.errors
    ) {
      return;
    }
    if (
      this.registerForm.value.password !=
      this.registerForm.value.password_confirmation
    ) {
      this.toastr.error('password id not matching');
      return;
    }

    $("#step1_par").removeClass("active");
    $("#step2_par").addClass("active");
    $("#step1").removeClass("active");
    $("#step2").addClass("active");
    this.isSubmitted = false;
  }

  goToPrev() {
    this.isSubmitted = false;
    $("#step2_par").removeClass("active");
    $("#step1_par").addClass("active");
    $("#step2").removeClass("active");
    $("#step1").addClass("active");
  }
}
