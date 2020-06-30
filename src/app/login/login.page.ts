import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from './../auth-service.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

import { Device } from '@ionic-native/device/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials = {
    user: '',
    pw: ''
  };
  device_id: any;


  constructor(
    private device:Device,
    private auth: AuthServiceService,
     private router: Router,
    private toastController: ToastController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {

  }

    getIMEI() {
    this.device_id=this.device.uuid;/*
    const { hasPermission } = await this.androidPermissions.checkPermission(
      this.androidPermissions.PERMISSION.READ_PHONE_STATE
    );
    if (!hasPermission) {
      const result = await this.androidPermissions.requestPermission(
        this.androidPermissions.PERMISSION.READ_PHONE_STATE
      ) ;
      if (!result.hasPermission) {
        throw new Error('Permissions required');
      }

      return 0;
    }
    this.device_id = this.uid.IMEI

     return this.uid.IMEI;*/
  }

  async presentToast(text: string) {
    const toast = await this.toastController.create({
      message: text,
      position: 'bottom',
      duration: 1500
    });
    toast.present();
  }
  async presentAlert(message: string) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Subtitle',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }


  async login() {
     this.getIMEI();

     let credTemp={user:this.credentials.user,pw:this.credentials.pw,imei:this.device_id}
    this.auth.login(credTemp).then(async res => {
    /*  if (res) {

        this.router.navigateByUrl('/home');
      } else {
        const alert = await this.alertCtrl.create({
          header: 'Login Failed',
          message: 'Contraseña y/o Usuario incorrectos.',
          buttons: ['OK']
        });
        await alert.present();
      }*/
    }, err => {
      //this.presentAlert(JSON.stringify(err));
    });
  }
}
