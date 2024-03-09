import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrameComponent } from './frame.component';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ImageCropperModule } from 'ngx-image-cropper';



@NgModule({
  declarations: [FrameComponent],
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild([{ path: '', component: FrameComponent}]),
    ImageCropperModule
  ],
  exports: [FrameComponent]
})
export class FrameModule { }
