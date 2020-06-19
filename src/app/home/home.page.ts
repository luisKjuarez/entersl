import { Component, ChangeDetectorRef } from '@angular/core';
import { UserDataService } from './../user-data.service';
import { IconsDataService } from './../icons-data.service';
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

export class HomePage {
  dataUser: any;
  dataIcons: any;
  createdCode: string;
  profilePictureTaken: string;
  portrait: boolean;
  userSesion = null;

  constructor(
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

    public apiUser: UserDataService, public apiIcons: IconsDataService, public screenO: ScreenOrientation,
    private menu: MenuController

  ) {


  }

  ionViewWillEnter() {
    this.userSesion = this.auth.getUser();
  }

  ngOnInit() {
    this.dataUser = { "nombre": "", "nss": "", "caducidad": "", "puesto": "" };

    this.plt.ready().then((readySource) => {
      this.initApis();

      this.loadProfilePicture();
      this.dataUser = this.storeService.getUserData();
      this.splashScreen.hide();
    });
    this.createdCode = "//J8*%&ndOPPPPis((388(nM;;8eibs,:ksi942jsnueNi83bn7)786%64";




  }





  /********* DATA METHODS *********/
  /////////////////////////////////

  /**
  *Initialize data that will be shown
  **/
  private initApis() {
    this.dataUser = { "nombre": "", "nss": "", "caducidad": "", "puesto": "" };
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
    this.getIconsData();
    this.unlockScreen();
    this.loadProfilePicture();
  }





  getIconsData() {
    this.apiIcons.getIconsData().subscribe(res => {
      console.log(res);
      this.dataIcons = res;
      console.log(this.dataIcons);
    }, err => {
      console.log(err);
    });
  }


  getUserData(name: string, token: string) {
    this.apiUser.getUserData(name, token).then(res => {
      if (res == null) {
        this.storeService.getUserData().then(res => {
          this.dataUser = JSON.parse(res);
        }
        );
        return;
      }
      this.dataUser = JSON.parse(res.data);
      this.storeService.storeUser(this.dataUser);
      console.log(this.dataUser);
    }, err => {
      console.log(err);
      this.dataUser = this.storeService.getUserData();
    });
  }


  /*********** VIEW METHODS **************/
  ////////////////////////////////////////

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

    }, 1500);
  }

  loadProfilePicture() {
    this.cache.clearAll();
    //  let correctPath = this.webview.convertFileSrc(this.file.dataDirectory + "profilept.jpg").substr(0, this.webview.convertFileSrc(this.file.dataDirectory + "profilept.jpg").lastIndexOf('/') + 1);
    this.profilePictureTaken = this.webview.convertFileSrc(this.file.dataDirectory + "profilept.jpg?var=" + Math.random());
    //  this.dataUser = { "nombre": "Manuel Sanchez Almazan", "nsocio": "NNND343-934S", "caducidad": "09/02/20", "foto": this.profilePictureTaken };
    this.changeDetectorRef.detectChanges();

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

  logout(){
    this.storeService.logout();
    this.auth.logout();
  }



  async selectImage() {
    this.navctr.navigateForward(['/crop-page']);
  }



}
