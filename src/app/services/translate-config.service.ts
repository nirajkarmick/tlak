import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})

export class TranslateConfigService {

  constructor(
    private translateSerice: TranslateService,
  ) 
  { 
    this.translateSerice.use('en');
  }

  changeLanguage(type:any) {
    this.translateSerice.use(type);
  }
}
