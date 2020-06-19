import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FilePath } from '@ionic-native/file-path/ngx';
import { ScreenOrientation} from '@ionic-native/screen-orientation/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
 import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import  {HttpClientModule,HttpClient} from '@angular/common/http';
import {IonicStorageModule} from '@ionic/storage';
import {OneSignal} from '@ionic-native/onesignal/ngx';
import { CacheModule  } from "ionic-cache";
import {Camera} from '@ionic-native/Camera/ngx';
import {File} from '@ionic-native/File/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import{Base64} from '@ionic-native/base64/ngx';
import { HTTP } from '@ionic-native/http/ngx';
  @NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,IonicStorageModule.forRoot(),CacheModule.forRoot(),
     HttpClientModule],
  providers: [
    StatusBar,ScreenOrientation,OneSignal,
    Camera,File,FilePath,WebView,Base64
    ,SplashScreen,HTTP,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy
       }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
