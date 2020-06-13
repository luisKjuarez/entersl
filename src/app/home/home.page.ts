import { Component, ChangeDetectorRef } from '@angular/core';
import { UserDataService } from './../user-data.service';
import { IconsDataService } from './../icons-data.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { MenuController, ToastController, Platform, ActionSheetController, AlertController, NavController } from '@ionic/angular';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/File/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { CacheService } from "ionic-cache";
import { Router, NavigationExtras } from '@angular/router';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  dataUser: any;
  dataIcons: any;
  createdCode: string;
  profilePictureTaken: string;
  portrait: boolean;
  constructor(
    private camera: Camera,
    private file: File,
    private navctr: NavController,
    private router: Router,
    private filePath: FilePath,
    private cache: CacheService,
    private plt: Platform,
    private splashScreen: SplashScreen,
    private toastController: ToastController,
    private webview: WebView,
    private alertController: AlertController,
    private changeDetectorRef: ChangeDetectorRef,
     public apiUser: UserDataService, public apiIcons: IconsDataService, public screenO: ScreenOrientation,
    private menu: MenuController

  ) { }


  ngOnInit() {
    this.plt.ready().then((readySource) => {
      console.log('Platform ready from', readySource);
      this.splashScreen.hide();
    });
    this.initApis();
     this.createdCode = "//J8*%&ndOPPPPis((388(nM;;8eibs,:ksi942jsnueNi83bn7)786%64";

    setTimeout(() => {

      this.loadProfilePicture();
    }, 500);
   

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

  async selectImage() {
    this.toCrop();
  }



  toCrop() {
    this.navctr.navigateForward(['/crop-page']);
  }

  loadProfilePicture() {
    this.cache.clearAll();
    //  let correctPath = this.webview.convertFileSrc(this.file.dataDirectory + "profilept.jpg").substr(0, this.webview.convertFileSrc(this.file.dataDirectory + "profilept.jpg").lastIndexOf('/') + 1);
    this.profilePictureTaken = this.webview.convertFileSrc(this.file.dataDirectory + "profilept.jpg?var=" + Math.random());
    this.dataUser = { "nombre": "Manuel Sanchez Almazan", "nsocio": "NNND343-934S", "caducidad": "09/02/20", "foto": this.profilePictureTaken };
    this.changeDetectorRef.detectChanges();

  }


  closeFirst() {
    this.menu.enable(false, 'first');
    this.menu.close('first');
  }

  refreshPage(event) {
    this.initApis();
    setTimeout(() => {
      event.target.complete();

    }, 1500);
  }


  private initApis() {
    this.dataUser = { "nombre": "Manuel Sanchez Almazan", "nsocio": "NNND343-934S", "caducidad": "09/02/20", "foto": this.profilePictureTaken };
    this.dataIcons = [{ "logo": "https://i.pinimg.com/originals/84/7c/08/847c083cc09040091439e3c05d1fedde.png", "url": "https://mail.google.com" }];
    this.getUserData();
    this.getIconsData();
    this.unlockScreen();
    this.loadProfilePicture();
  }


  private unlockScreen() {
    this.screenO.unlock();
  }



  async getIconsData() {
    this.apiIcons.getIconsData().subscribe(res => {
      console.log(res);
      this.dataIcons = res;
      console.log(this.dataIcons);
    }, err => {
      console.log(err);
    });
  }


  async getUserData() {
    this.apiUser.getUserData().subscribe(res => {
      console.log(res);
      this.dataUser = res;
      console.log(this.dataUser);
    }, err => {
      console.log(err);

    });
  }

}
