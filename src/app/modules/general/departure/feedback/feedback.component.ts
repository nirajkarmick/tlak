import {Component, OnInit} from '@angular/core';
import {CommunicationService} from "../../../../services/communication.service";
import {Router, ParamMap, ActivatedRoute} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import { TranslateConfigService } from "../../../../services/translate-config.service";

declare var $: any;

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  package_id: any

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private CommunicationService: CommunicationService,
    private toastr: ToastrService,
    private translate: TranslateConfigService
  ) {
    this.package_id = this.route.snapshot.queryParams['package_id'];
    if (this.package_id === undefined) {
      this.toastr.error('Package not found!');
      this.router.navigateByUrl('/departure-create');
    } else {
      this.render_data();
    }
  }

  ngOnInit(): void {
  }

  feedback: any;

  render_data() {
    this.CommunicationService.Feedback(this.package_id).subscribe((res: any) => {
      this.feedback = res.data.feedbacks.data;
    });
  }
}
