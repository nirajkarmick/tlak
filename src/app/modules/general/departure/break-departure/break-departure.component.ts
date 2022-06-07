import { Component, OnInit } from '@angular/core';
import { Data, ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { TravellersService } from '../../../../services/travellers.service'
import { HttpClient } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { GoogleChartComponent } from 'angular-google-charts';

declare var $: any;

@Component({
  selector: 'app-break-departure',
  templateUrl: './break-departure.component.html',
  styleUrls: ['./break-departure.component.css']
})
export class BreakDepartureComponent implements OnInit {
  credentials = { agent_id: "", travellers: "", passcode: "" };
  package_id: any;
  isLoading = true;
  comp_id = localStorage.getItem('company_id');
  passcode: any;
  passcodeedit: any;
  depBreakForm: FormGroup;
  agentEdit: FormGroup;
  isSubmitted = false;
  isSubmitted1 = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private travellerServices: TravellersService,
    private http: HttpClient,
    private toastr: ToastrService,
  ) {
    this.package_id = this.route.snapshot.queryParams['package_id'];
    if (this.package_id === undefined) {
      this.toastr.error('Package not found!');
      this.router.navigateByUrl('/departure-create');
    } else {
      this.render_data();
    }

    this.depBreakForm = this.formBuilder.group({
      agent_id: ["", Validators.required],
      travellers: [""],
      passcode: ["", Validators.required],
    })
    this.agentEdit = this.formBuilder.group({
      agentName: [""],
      agent_id: ["", Validators.required],
      travellers: [""],
      passcode: ["", Validators.required],
    })
  }

  agents: any;
  travelers: any;
  selected_people: any;
  agentList: any;
  agentListAll: any;
  addedTravellers: any = [];
  addagent: any = [];

  render_data() {
    this.isLoading = false;
    this.getAgentList();
    this.travellerServices.GetAgentsList(this.package_id).subscribe((res: any) => {
      console.log(res, 'sdfasd');
      this.agentList = res.data;
    })
  }

  getAgentList() {
    this.travellerServices.Getagents(this.package_id).subscribe((res: any) => {
      //console.log(res);
      this.agentListAll = res.agents;
      this.travelers = res.traveller;
      this.agents = this.agentListAll;
      //console.log(this.agents, 'allagents')
    })

  }

  ngOnInit(): void {
  }

  pushPeople() {
    this.depBreakForm.patchValue({
      travellers: this.selected_people,
    });
  }

  copyPass() {
    var $temp = $("<input>");
    //let changeIcon = $('#travellerPass p i.fas');
    $("body").append($temp);
    $temp.val($('#tpasscode').text()).select();
    document.execCommand("copy");
    this.toastr.success("Text copied");
    $temp.remove();
    //changeIcon.css('color', '#3727f7')
  }

  copyPassedit() {
    var $temp = $("<input>");
    //let changeIcon = $('#travellerPassedit p i.fas');
    $("body").append($temp);
    $temp.val($('#tpasscodeedit').text()).select();
    document.execCommand("copy");
    this.toastr.success("Text copied");
    $temp.remove();
    //changeIcon.css('color', '#3727f7')
  }

  get form() {
    this.isSubmitted = true;
    return this.depBreakForm.controls;
  };

  get form1() {
    this.isSubmitted1 = true;
    return this.depBreakForm.controls;
  };

  depBreakSubmit() {
    this.isSubmitted = true;
    if (this.depBreakForm.invalid) {
      return
    } else {
      this.travellerServices.depBreakSubmit(this.package_id, this.depBreakForm.value).subscribe((res: any) => {
        if (res.status == 200) {
          //console.log(res);
          this.render_data();
          this.depBreakForm.reset();
          this.isSubmitted = false;
          this.clearFilter();
          this.toastr.success(res.message);
        }
        if (res.error == 200) {
          this.toastr.error(res.message);
          this.render_data();
        }


      })
    }
  }

  clearFilter() {
    this.selected_people = this.selected_people[0];
  }

  agent_id: any;
  agent_name: any;
  editpasscode: any;
  edittravellerall: any;
  edittraveller: any = [];
  edit_selected_people: any = [];
  edit_selected_people_id: any;

  edittravelernpass(agent_id: any, agent_name: any) {
    this.agent_id = agent_id;
    //console.log(this.package_id, this.agent_id)
    this.travellerServices.editTravelerPass(this.agent_id, this.package_id).subscribe((res: any) => {
      console.log(res, 'sdfasdsdfasdfs');
      this.edittraveller = res.traveller;
      this.edittravellerall = this.edittraveller;
      this.edit_selected_people_id = res.data.traveller_id;
      this.render_data();
      if (res.data.travellers.length >= 0) {
        for (let i = 0; i < res.data.travellers.length; i++) {
          this.edittravellerall.push(res.data.travellers[i])
        }
      }
      // console.log(this.edittravellerall, 'list traveler');
      //console.log(this.edit_selected_people);
      this.agentEdit.patchValue({
        agentName: res.data.agent_name,
        passcode: res.data.passcode,
        agent_id: this.agent_id
      })
    })
  }

  pusheditPeople() {
    this.edit_selected_people
    this.agentEdit.patchValue({
      travellers: this.edit_selected_people_id,
    });
  }

  editagent() {
    this.isSubmitted1 = true;
    if (this.agentEdit.invalid) {
      return
    } else {
      //console.log(this.agentEdit.value)
      this.travellerServices.agentUpdateSubmit(this.package_id, this.agentEdit.value).subscribe((res: any) => {
        // console.log(res);
        this.toastr.success(res.message);
        document.getElementById('closeModel')?.click();
        this.render_data();
      })
    }
  }

  travellers: any;
  del_agent_name: any;
  del_agent_id: any;
  del_passcode: any;
  del_travellers: any = [];

  deleteAgent(id: any, pass: any, name: any) {
    this.del_agent_id = id;
    this.del_passcode = pass;
    this.del_agent_name = name;
    this.travellerServices.editTravelerPass(this.del_agent_id, this.package_id).subscribe((res: any) => {
      console.log(res)
      this.del_travellers = res.data.traveller_id;
      this.render_data();
    })

    //this.del_travellers = this.edit_selected_people_id;

    console.log(this.del_agent_id, this.del_passcode, this.del_travellers)
  }

  delAgent() {
    console.log(this.del_agent_id, this.del_travellers, this.del_passcode)
    var data = {
      agent_id: this.del_agent_id,
      travellers: this.del_travellers,
      passcode: this.del_passcode,
    }
    this.travellerServices.agentDelete(this.package_id, data).subscribe((res: any) => {
      this.toastr.success(res.message);
      this.render_data();
    })
  }
}
