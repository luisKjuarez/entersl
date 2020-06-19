import { Component } from '@angular/core';

import { Platform ,AlertController} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
 import { OneSignal } from '@ionic-native/onesignal/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public notifyEnabled: boolean;

  constructor(
     private oneSignal: OneSignal,
    private alertCtrl: AlertController,
     private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,

  ) {
    this.initializeApp();
  }

  notifyChange(event) {
    setTimeout(() => {
      this.notifyEnabled = event.detail.checked;
      console.log(this.notifyEnabled);

    }, 0);

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.notifyEnabled = false;
    if (this.platform.is('cordova')) {
      this.setPush();
    }
  }

  setPush() {
    this.oneSignal.startInit('e81321ad-c92d-4954-a618-55ce4a9bb941', '177240469620');

    this.oneSignal.handleNotificationOpened().subscribe(data => {
      let addData=data.notification.payload.additionalData;
      this.showAlert("opened","you hav readed before",addData);

    });


    this.oneSignal.handleNotificationReceived().subscribe(data => {
      let msg = data.payload.body;
      let title = data.payload.title;
      let addData = data.payload.additionalData;
      this.showAlert(title, msg, addData.task);
    });
    this.oneSignal.endInit();
  }


  async showAlert(title, msg, task) {
    const alert = await this.alertCtrl.create({
      header: title,
      subHeader: msg,
      buttons: [
        {
          text: `Action: ${task}`,
          handler: () => {

          }
        }
      ]
    })
    alert.present();
  }

}
