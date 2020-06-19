import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from './../auth-service.service';
import { take, map } from 'rxjs/operators';
import { AlertController, ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(private toastController:ToastController,private router: Router, private auth: AuthServiceService, private alertCtrl: AlertController) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.user.pipe(
      take(1),
      map(user => {
        if (user==null) {

           
          this.router.navigateByUrl('login');
          return false;
        } else {


          return true;
        }
      })
    )
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
