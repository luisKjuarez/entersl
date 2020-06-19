import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { File } from '@ionic-native/File/ngx';
import { ToastController, AlertController, ActionSheetController } from '@ionic/angular';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { Observable } from 'rxjs/internal/Observable';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera/ngx';
import { Router } from '@angular/router';
//another change
@Component({
  selector: 'app-crop-page',
  templateUrl: './crop-page.page.html',
  styleUrls: ['./crop-page.page.scss'],
})
export class CropPagePage implements OnInit {
  @ViewChild(ImageCropperComponent, { static: false }) angularCropper: ImageCropperComponent;

  cropperOptions: any;
  scaleValY = 1;
  myImage = null;
  croppedImage = null;
  scaleValX = 1;
  constructor(
    private file: File,
    private router: Router,

    private actionSheetController: ActionSheetController,
    private camera: Camera,
    private toastController: ToastController,
    private alertController: AlertController,
    private changeDetectorRef: ChangeDetectorRef
  ) {



    this.cropperOptions = {
      dragMode: 'crop',
      aspectRatio: 1,
      autoCrop: true,
      movable: true,
      zoomable: true,
      scalable: true,
      autoCropArea: 0.8,
    };
  }

  ngOnInit() {

    this.selectImage();
    this.changeDetectorRef.detectChanges();
  }

  async  takePicture(sourceType: PictureSourceType) {
    var options: CameraOptions;
    if (this.camera.PictureSourceType.PHOTOLIBRARY == sourceType)
      options = {
        quality: 50,
        correctOrientation: true,
        allowEdit: true,
        targetWidth: 600,
        targetHeight: 600,
        sourceType: sourceType,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
        ,
      };
    else
      options = {
        quality: 60,
        sourceType: sourceType,
        destinationType: this.camera.DestinationType.DATA_URL,
        saveToPhotoAlbum: false,
        correctOrientation: true,
        mediaType: this.camera.MediaType.PICTURE,
        encodingType: this.camera.EncodingType.JPEG
      };
    await this.camera.getPicture(options).then((data) => {
      this.myImage = 'data:image/jpeg;base64,' + data;

    }, err => {
      this.return2Home();
    });
  }





  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: "Seleccione su imagen",
      buttons: [{
        text: 'Galeria',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Camara',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Cancelar',
        role: 'cancel',
        handler: () => {
          this.return2Home();
        }
      }
      ]
    });
    await actionSheet.present();

  }




  convertFile2Data(url: string) {
    return Observable.create(observer => {
      let xhr: XMLHttpRequest = new XMLHttpRequest();
      xhr.onload = function() {
        let reader: FileReader = new FileReader();
        reader.onloadend = function() {
          observer.next(reader.result);
          observer.complete();
        };
        reader.readAsDataURL(xhr.response);

      };
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.send();
    });
  }



  cropped(event: ImageCroppedEvent) {

    this.croppedImage = event.base64;
  }





  return2Home() {

    this.router.navigate(['/home'])
      .then(() => {
        window.location.reload();
      });
  }
  cancel() {
    this.return2Home();
    //return to home
  }

  save() {
    let realData = this.croppedImage.split(",")[1];
    let blob = this.b64toBlob(realData, 'image/jpeg');

    this.file.writeFile(this.file.dataDirectory, 'profilept.jpg', blob, { replace: true }).then(response => {
      this.return2Home();
    }).catch(err => {
      this.presentAlert("error guardando");
      this.return2Home();
    })

  }



  b64toBlob(b64Data, contentType) {
    contentType = contentType || '';
    var sliceSize = 512;
    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }


  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Subtitle',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }


  async presentToast(text: string) {
    const toast = await this.toastController.create({
      message: text,
      position: 'bottom',
      duration: 1500
    });
    toast.present();
  }


}
