import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
 import { Device } from '@ionic-native/device/ngx';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registrationForm: FormGroup;
  device_id:any;
  credentials = {
    user: '',
    pwc:'',
    pw: '',
    curp: ''
  };
  constructor(private auth: AuthServiceService,
  private  device:Device,
   private  fb:FormBuilder,
     private router: Router,
    private toastController: ToastController,
    private alertCtrl: AlertController) {
      this.initFOrm();
      this.getIMEI();
     }

  ngOnInit() {
  }

    getIMEI() {
this.device_id=this.device.uuid;
      /*
    const { hasPermission } = await this.androidPermissions.checkPermission(
      this.androidPermissions.PERMISSION.READ_PHONE_STATE
    );
    if (!hasPermission) {
      const result = await this.androidPermissions.requestPermission(
        this.androidPermissions.PERMISSION.READ_PHONE_STATE
      );
      if (!result.hasPermission) {
        throw new Error('Permissions required');
      }

      return 0;
    }
    this.device_id = this.uid.IMEI
     return this.uid.IMEI;*/
  }

    matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }

initFOrm(){
  this.registrationForm = this.fb.group({

    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    curp: ['', Validators.required],
    user: ['', Validators.required]
  }, {validator: this.matchingPasswords('password', 'confirmPassword')});

}
  register() {

  let  credentialsConf = {
      user: this.credentials.user,
       pw: this.credentials.pw,
      curp: this.credentials.curp,
      imei:this.device_id
    };
    this.auth.register(credentialsConf).then(async res => {

    }, err => {


    });
  }



    async presentAlert(message: string,title:string, subtitle:string) {
      const alert = await this.alertCtrl.create({
        cssClass: 'my-custom-class',
        header: title,
        subHeader: subtitle,
        message: message,
        buttons: ['OK']
      });

      await alert.present();
    }


}
