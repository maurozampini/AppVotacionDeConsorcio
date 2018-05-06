import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ContactPage } from '../pages/contact/contact';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { MenuVotaPage } from '../pages/menu-vota/menu-vota';

export const firebaseConfig = {
  apiKey: "AIzaSyC1Bc3PSTlTnfIexQESCmGBMzUcQopi_20",
  authDomain: "votaciondeconsorcio-mauro.firebaseapp.com",
  databaseURL: "https://votaciondeconsorcio-mauro.firebaseio.com",
  projectId: "votaciondeconsorcio-mauro",
  storageBucket: "votaciondeconsorcio-mauro.appspot.com",
  messagingSenderId: "906964362699"
};
  

@NgModule({
  declarations: [
    MyApp,
    ContactPage,
    LoginPage,
    RegisterPage,
    MenuVotaPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactPage,
    LoginPage,
    RegisterPage,
    MenuVotaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
