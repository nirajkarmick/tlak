import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NotificationRoutingModule } from './notification-routing.module';
import { NotificationComponent } from './notification.component';
import { DepartureSidebarModule } from "../departure-sidebar/departure-sidebar.module";
import { ReactiveFormsModule } from "@angular/forms";
import { ImageCropperModule } from "ngx-image-cropper";


@NgModule({
  declarations: [
    NotificationComponent
  ],
  imports: [
    CommonModule,
    NotificationRoutingModule,
    DepartureSidebarModule,
    ReactiveFormsModule,
    ImageCropperModule,
    TranslateModule
  ]
})
export class NotificationModule { }
