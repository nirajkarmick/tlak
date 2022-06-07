import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import { AngularEditorConfig } from '@kolkov/angular-editor';
import {CommunicationService} from "../../../../services/communication.service";
import {TranslateConfigService} from "../../../../services/translate-config.service";

declare let $: any;

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.css']
})
export class TermsAndConditionsComponent implements OnInit {
  package_id: any;
  credentials = {terms: ""};
  termsCondition: FormGroup;
  isSubmitted = false;
  termsData = "";

  constructor(
    private ReactiveFormsModule: ReactiveFormsModule,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private CommunicationService: CommunicationService,
    private http: HttpClient,
    private toastr: ToastrService,
    private translate: TranslateConfigService
  ) {

    this.termsCondition = this.formBuilder.group({
      terms: ["", Validators.required],
    });

    this.package_id = this.route.snapshot.queryParams['package_id'];
    if (this.package_id === undefined) {
      alert('Package not found!');
      this.router.navigateByUrl('/departure-create');
    } else {
      this.render_data();
    }

  }

  render_data() {
    this.CommunicationService.TConditions(this.package_id).subscribe((res: any) => {
      console.log(res)
      this.termsCondition.patchValue({terms: res.data.terms})
      this.termsData = res.data.terms;
      console.log(this.termsData, "dafasdf")
    })
  }


  get form() {
    return this.termsCondition.controls;
  }

  ngOnInit(): void {
    /*document.getElementById('termsText').innerHTML = document.getElementById("termsText").value.replace(/\n/g, '<br />')*/

  }

  Terms() {
    /*let str = document.getElementById('termsText').innerHTML
    str.replace(/\n/g, '<br>');*/
    console.log(this.termsData)
    /*this.isSubmitted = true;
    if (this.termsCondition.invalid) {
      return
    } else {*/
      var data = {'terms':this.termsData};
      this.CommunicationService.TermsUpdate(this.package_id, data).subscribe((res: any) => {
        console.log(res);
        this.toastr.success(res.message);
        this.render_data();
      })
    //}
  }

  htmlContent: any;
  config: AngularEditorConfig = {
    editable: true,
    //spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'false',
    sanitize: false,
    defaultFontSize: 'false',
    enableToolbar: false,
  };
}
