import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CropPagePageRoutingModule } from './crop-page-routing.module';
 
import { CropPagePage } from './crop-page.page';
import {ImageCropperModule} from  'ngx-image-cropper';
@NgModule({
  imports: [
    CommonModule,
    ImageCropperModule,
    FormsModule,
    IonicModule,
     CropPagePageRoutingModule
  ],
  declarations: [CropPagePage]
})
export class CropPagePageModule {}
