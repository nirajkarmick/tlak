import { Component, OnInit } from '@angular/core';
import { AdminControlService } from "../../../services/admin-control.service";
import { TranslateConfigService } from "../../../services/translate-config.service";
import { TranslateService } from '@ngx-translate/core';
declare let $: any;

@Component({
  selector: 'app-travellers',
  templateUrl: './travellers.component.html',
  styleUrls: ['./travellers.component.css']
})
export class TravellersComponent implements OnInit {
  isLoading = true;
  travellerList: any;
  TravelerCount: any;
  constructor(
    private adminService: AdminControlService,
    private translate: TranslateConfigService
  ) {
    this.renderData();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 1400);
  }

  renderData() {
    this.adminService.travellers().subscribe((res: any) => {
      this.travellerList = res.data.packege_list;
      this.TravelerCount = res.data.packege_list_count;
      console.log(this.travellerList, 'data')
    })
  }

}
