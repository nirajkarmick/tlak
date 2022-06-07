import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './setting.component';
import { ImageCroppedEvent, ImageCropperModule } from "ngx-image-cropper";
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    SettingComponent
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ImageCropperModule,
    TranslateModule
  ]
})
export class SettingModule {
}
