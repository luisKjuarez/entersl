import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from './../auth-service.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

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


  constructor(
    private auth: AuthServiceService,
    private router: Router,
    private toastController: ToastController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
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


  login() {
    this.auth.login(this.credentials).then(async res => {
      if (res) {
        this.router.navigateByUrl('/home');
      } else {
        const alert = await this.alertCtrl.create({
          header: 'Login Failed',
          message: 'Contraseña y/o Usuario incorrectos.',
          buttons: ['OK']
        });
        await alert.present();
      }
    }, err => {
      this.presentAlert(JSON.stringify(err));
    });
  }
}
