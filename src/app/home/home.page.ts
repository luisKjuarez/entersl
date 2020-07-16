import { Component, ChangeDetectorRef, ElementRef, OnInit } from '@angular/core';
import { UserDataService } from './../user-data.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { MenuController, Platform, AlertController, NavController } from '@ionic/angular';
import { File } from '@ionic-native/File/ngx';
import { CacheService } from "ionic-cache";
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { AuthServiceService } from '../auth-service.service';
import { StoreUserService } from '../store-user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  photoJson: any = null;
  logoEmpJson: any = null;
  logo2Json: any = null;
  logo3Json: any = null;
  qrJson: any = null;
  detailsJson: any = null;

  details2Json: any = null;
  details3Json: any = null;
  details4Json: any = null;

  qr2: any = null;

  styleTest = " grid-column:4; grid-row:4; border:solid white 3px;";
  dataUser: any;
  dataIcons: any;
  createdCode: string = "prueba";
  profilePictureTaken: string;
  portrait: boolean;
  testStyl: string = "<p style='color:red;float:right;''>rojoocj</p><p >jj</p>";
  userSesion = null;
  public notifyEnabled: boolean;
  currentCompany: any;

  seccion1: any = null;
  seccion2: any = null;
  seccion3: any = null;

  constructor(
    private elementRef: ElementRef,
    private file: File,
    private navctr: NavController,
    private cache: CacheService,
    private plt: Platform,
    private splashScreen: SplashScreen,
    private webview: WebView,
    private alertController: AlertController,
    private changeDetectorRef: ChangeDetectorRef,
    private storeService: StoreUserService,
    private auth: AuthServiceService,
    public apiUser: UserDataService, public screenO: ScreenOrientation,
    private menu: MenuController

  ) {


  }

  ionViewWillEnter() {
    this.userSesion = this.auth.getUser();
    this.loadProfilePicture();
  }
  ionViewDidEnter() {
    this.userSesion = this.auth.getUser();
    this.loadProfilePicture();

  }

  ngOnInit() {
    this.dataUser = { "nombre": "", "nss": "", "caducidad": "", "puesto": "" };
    this.currentCompany = { "nombre": "" };
    this.plt.ready().then((readySource) => {
      this.initApis();
      this.loadProfilePicture();
      this.dataUser = this.storeService.getUserData();
      this.splashScreen.hide();
    });
    this.createdCode = "prueba";




  }





  /********* DATA METHODS *********/
  /////////////////////////////////

  /**
  *Initialize data that will be shown
  **/
  private initApis() {
    this.dataUser = { "nombre": "", "nss": "", "caducidad": "", "puesto": "", "curp": "", "companies": {} };
    let dateNow = +new Date();
    let dateExp = this.auth.getUser().exp + 0;
    if ((dateNow + "").length == 10)
      dateNow = dateNow * 1000;
    if ((dateExp + "").length == 10)
      dateExp = dateExp * 1000;
    if (dateNow >= dateExp) {
      this.presentAlert("Error", "Sesion expirada.", "Por favor vuelva a iniciar sesion.");
      this.storeService.logout();
      this.auth.logout();
    }


    this.getUserData(this.auth.getUser().namep, this.auth.getToken());



    this.unlockScreen();

    this.loadProfilePicture();

  }


  col = 1;

  changeVar() {

if(this.currentCompany.headerColor!=null)
this.elementRef.nativeElement.style.setProperty("--headercolor-port", this.currentCompany.headerColor);


if(this.currentCompany.footerColor!=null)
this.elementRef.nativeElement.style.setProperty("--footercolor-port", this.currentCompany.footerColor);

    if (this.currentCompany.fondoRGB != null)
      this.elementRef.nativeElement.style.setProperty("--bkcolor-port", this.currentCompany.fondoRGB);
    if (this.currentCompany.fondoImg != null)
      this.elementRef.nativeElement.style.setProperty("--bkimage-port", this.currentCompany.fondoImg);
    if (this.photoJson != null) {
      for (let data of this.photoJson.styles) {

        this.elementRef.nativeElement.style.setProperty(data.name, data.value);




      }


    }
    if(this.qr2!=null){
      for (let data of this.qr2.styles) {
        this.elementRef.nativeElement.style.setProperty(data.name, data.value);

      }
    }
    if (this.qrJson != null) {
      for (let data of this.qrJson.styles) {
        this.elementRef.nativeElement.style.setProperty(data.name, data.value);

      }
    }

    if (this.logoEmpJson != null) {
      for (let data of this.logoEmpJson.styles) {
        this.elementRef.nativeElement.style.setProperty(data.name, data.value);

      }


    }

    if (this.logo2Json != null) {
      for (let data of this.logo2Json.styles) {
        this.elementRef.nativeElement.style.setProperty(data.name, data.value);

      }


    }

    if (this.logo3Json != null) {
      for (let data of this.logo3Json.styles) {
        this.elementRef.nativeElement.style.setProperty(data.name, data.value);

      }


    }

    if (this.detailsJson != null) {
      for (let data of this.detailsJson.styles) {
        this.elementRef.nativeElement.style.setProperty(data.name, data.value);

      }


    }

    if (this.details2Json != null) {
      for (let data of this.details2Json.styles) {
        this.elementRef.nativeElement.style.setProperty(data.name, data.value);

      }
    }

    if (this.details3Json != null) {
      for (let data of this.details3Json.styles) {
        this.elementRef.nativeElement.style.setProperty(data.name, data.value);

      }
    }

    if (this.details4Json != null) {
      for (let data of this.details4Json.styles) {
        this.elementRef.nativeElement.style.setProperty(data.name, data.value);

      }
    }
  }


  uploadImg() {
    this.apiUser.uploadImage(this.auth.getUser().namep, this.auth.getToken(), this.file.dataDirectory + "profilept.jpg").then(res => {
    }, err => {
    })
  }


  selectedCompani: number = 0;


  logo2: any = {};
  getUserData(name: string, token: string) {
    this.apiUser.getUserData(name, token).then(res => {
      if (res == null) {
        this.storeService.getUserData().then(res => {
          this.dataUser = JSON.parse(res);

          this.currentCompany = this.dataUser.companies[this.selectedCompani].ids[0];
          this.dataIcons = this.dataUser.companies[this.selectedCompani].anuncios;
          this.photoJson = this.currentCompany.photo;
          this.logoEmpJson = this.currentCompany.logoE;
          this.logo2Json = this.currentCompany.logo2;
          this.logo3Json = this.currentCompany.logo3;
          this.qrJson = this.currentCompany.qr;
          this.detailsJson = this.currentCompany.details;
          this.details2Json = this.currentCompany.details2;
          this.details3Json = this.currentCompany.details3;
          this.details4Json = this.currentCompany.details4;
          this.qr2 = this.currentCompany.qr2;

          this.changeVar();
          //  this.presentAlert("kk4", "", JSON.stringify(this.currentCompany));
          //    this.createdCode = this.dataUser.nss;
          var dateExpire = new Date(this.dataUser.caducidad)
          var currDate = new Date();
          if (dateExpire <= currDate) {
            this.storeService.logout();
            this.auth.logout();
          }
        }
        );
        return;
      }
      this.dataUser = JSON.parse(res.data);
      this.storeService.storeUser(this.dataUser);
      this.currentCompany = this.dataUser.companies[this.selectedCompani].ids[0];
      this.dataIcons = this.dataUser.companies[this.selectedCompani].anuncios;

      this.photoJson = this.currentCompany.photo;
      this.logoEmpJson = this.currentCompany.logoE;
      this.logo2Json = this.currentCompany.logo2;
      this.logo3Json = this.currentCompany.logo3;
      this.qrJson = this.currentCompany.qr;
      this.detailsJson = this.currentCompany.details;
      this.details2Json = this.currentCompany.details2;
      this.details3Json = this.currentCompany.details3;
      this.details4Json = this.currentCompany.details4;
      this.qr2 = this.currentCompany.qr2;
      this.changeVar();
      //  this.presentAlert("kk7", "", JSON.stringify(this.logo2));


      //  this.createdCode = this.dataUser.nss;
      var dateExpire = new Date(this.dataUser.caducidad)
      var currDate = new Date();
      if (dateExpire <= currDate) {
        this.storeService.logout();
        this.auth.logout();
      }
      console.log(this.dataUser);
    }, err => {
      this.dataUser = this.storeService.getUserData();

      this.currentCompany = this.dataUser.companies[this.selectedCompani].ids[0];
      this.dataIcons = this.dataUser.companies[this.selectedCompani].anuncios;

      this.photoJson = this.currentCompany.photo;
      this.logoEmpJson = this.currentCompany.logoE;
      this.logo2Json = this.currentCompany.logo2;
      this.logo3Json = this.currentCompany.logo3;
      this.qrJson = this.currentCompany.qr;
      this.detailsJson = this.currentCompany.details;
      this.details2Json = this.currentCompany.details2;
      this.details3Json = this.currentCompany.details3;
      this.details4Json = this.currentCompany.details4;
      this.qr2 = this.currentCompany.qr2;

      this.changeVar();
      //  this.presentAlert("kk9", "", JSON.stringify(this.currentCompany));

      var dateExpire = new Date(this.dataUser.caducidad)
      var currDate = new Date();
      if (dateExpire <= currDate) {
        this.storeService.logout();
        this.auth.logout();
      }
    });

  }


  /*********** VIEW METHODS **************/
  ////////////////////////////////////////
  notifyChange(event) {
    document.documentElement.style.setProperty
    setTimeout(() => {
      this.notifyEnabled = event.detail.checked;
      console.log(this.notifyEnabled);

    }, 0);

  }

  changedCompany(event) {
    let count: number = 0;
    for (let data of this.dataUser.companies) {
      if (data.companyName === event.target.value) {
        this.currentCompany = data.ids[0];
        this.selectedCompani = count;
        this.currentCompany = this.dataUser.companies[this.selectedCompani].ids[0];
        this.dataIcons = this.dataUser.companies[this.selectedCompani].anuncios;

        this.photoJson = this.currentCompany.photo;
        this.logoEmpJson = this.currentCompany.logoE;
        this.logo2Json = this.currentCompany.logo2;
        this.logo3Json = this.currentCompany.logo3;
        this.qrJson = this.currentCompany.qr;
        this.detailsJson = this.currentCompany.details;
        this.details2Json = this.currentCompany.details2;
        this.details3Json = this.currentCompany.details3;
        this.details4Json = this.currentCompany.details4;
        this.qr2 = this.currentCompany.qr2;

        this.changeVar();

        break;
      }
      count++;
    }

    this.presentAlert("", "", JSON.stringify(this.currentCompany));
  }
  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  closeFirst() {
    this.menu.enable(false, 'first');
    this.menu.close('first');
  }

  private unlockScreen() {
    this.screenO.unlock();
  }

  refreshPage(event) {
    this.initApis();
    setTimeout(() => {
      event.target.complete();

    }, 1600);
  }

  loadProfilePicture() {

    this.cache.clearAll();

    this.profilePictureTaken = this.webview.convertFileSrc(this.file.dataDirectory + "profilept.jpg?var=" + Math.random());

    this.uploadImg();
  }


  async presentAlert(title: string, subtitle: string, message: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: title,
      subHeader: subtitle,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  logout() {
    this.storeService.logout();
    this.auth.logout();
  }



  async selectImage() {
    this.navctr.navigateForward(['/crop-page']);
  }



}
