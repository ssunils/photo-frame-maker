import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.scss'],
})
export class FrameComponent implements OnInit {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  photo: unknown;

  imageChangedEvent: any = '';
  croppedImage: any;
  @ViewChild(IonModal)
  modal!: IonModal;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string | undefined;
  isModalOpen = false;
  idDownloadReady = false;

  private badge: string = '/assets/icon/badge.png';
  private targetWidth: number = 3000;  // Desired width
  private targetHeight: number = 3000; // Desired height

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }


  ngOnInit() { }

  fileChangeEvent(event: any): void {
    console.log(event)
    this.imageChangedEvent = event;
    this.setOpen(true);
  }
  imageCropped(event: ImageCroppedEvent) {
    console.log(event.objectUrl)
    this.croppedImage = event.objectUrl || event.base64 || '';
  }
  setOpen(isOpen: boolean) {
    console.log(isOpen)
    this.isModalOpen = isOpen;
  }
  imageLoaded(image: LoadedImage) {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  confirmMerge() {
    this.mergeImages();
    this.setOpen(false);
  }
  mergeImages() {
    this.idDownloadReady = true;

    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    // Set canvas size
    canvas.width = this.targetWidth;
    canvas.height = this.targetHeight;

    const image1 = new Image();
    const image2 = new Image();

    image1.onload = () => {
      // Optionally resize image1 here if necessary
      ctx.drawImage(image1, 350, 350, 2300, 2300);
      image2.onload = () => {
        // Optionally resize image2 here if necessary
        ctx.drawImage(image2, 0, 0, this.targetWidth, this.targetHeight);
      };
      image2.src = this.badge;
    };
    image1.src = this.croppedImage;
  }
  downloadImage() {
    // Use the canvas toDataURL method to get the image data as JPEG
    const dataUrl = this.canvasRef.nativeElement.toDataURL('image/jpeg');

    // Create a temporary link to trigger the download
    const link = document.createElement('a');
    link.download = Date.now() + 'merged-image.jpeg';
    link.href = dataUrl;
    link.click();
  }
  resetImage() {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    // Clear the entire canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.idDownloadReady = false;
  }
}
