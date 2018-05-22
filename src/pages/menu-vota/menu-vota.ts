import { Component, ViewChild, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, Platform } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { ContactPage } from '../contact/contact';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-menu-vota',
  templateUrl: 'menu-vota.html',
})
export class MenuVotaPage {

  platform: any;
  selectedItem: any;
  usuarioIngresado: string;
  list: FirebaseListObservable<any>;
  Mensaje: string;
  Voto: boolean;
  data: any;
  contadorPlanta: number;
  contadorMatafuegos: number;
  doughnutChart: any;
  @ViewChild('doughnutCanvas') doughnutCanvas;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    db: AngularFireDatabase,
    public alertCtrl: AlertController,
    private authAf: AngularFireAuth,
    private toastCtrl: ToastController,
    @Inject(Platform) platform) {
    this.navParams = navParams;
    this.selectedItem = navParams.get('item');
    this.platform = platform;
    console.log(this.platform);
    this.platform.registerBackButtonAction(() => { this.confirmarCerrarSesion() });

    this.contadorPlanta = 0;
    this.contadorMatafuegos = 0;
    this.Voto = false;
    this.usuarioIngresado = navParams.get("usuario");
    this.list = db.list('/Votacion');

    db.list('/Votacion', { preserveSnapshot: true })
      .subscribe(snapshots => {
        snapshots.forEach(snapshot => {
          if (snapshot.val().mensaje == "Plantas")
            this.contadorPlanta += 1;
          else
            this.contadorMatafuegos += 1;
          if (snapshot.val().usuario == this.usuarioIngresado)
            this.Voto = true;
        });
      });
  }

  votoPlanta() {
    if (!this.Voto) {
      this.contadorPlanta = 0;
      this.contadorMatafuegos = 0;
      this.Mensaje = "Votó por poner plantas";
      this.list.push({
        usuario: this.usuarioIngresado,
        mensaje: "Plantas"
      });
    }
    else {
      this.Mensaje = "Este usuario ya votó";
    }

    let toast = this.toastCtrl.create(
      {
        message: this.Mensaje,
        duration: 2000,
        position: 'middle',
        cssClass: "ToastWarning",
        dismissOnPageChange: true
      });
    toast.present();
  }

  votaMatafuego() {
    if (!this.Voto) {
      this.contadorPlanta = 0;
      this.contadorMatafuegos = 0;
      this.Mensaje = "Votó por poner matafuegos";
      this.list.push(
        {
          usuario: this.usuarioIngresado,
          mensaje: "Matafuegos"
        });
    }
    else {
      this.Mensaje = "Este usuario ya votó";
    }


    let toast = this.toastCtrl.create(
      {
        message: this.Mensaje,
        duration: 2000,
        position: 'middle',
        cssClass: "ToastWarning",
        dismissOnPageChange: true
      });
    toast.present();

  }

  Grafico() {
    if (this.Voto == true) {
      this.navCtrl.push(ContactPage);
    }
    else {
      this.Mensaje = "Este usuario no votó";
      let toast = this.toastCtrl.create(
        {
          message: this.Mensaje,
          duration: 2000,
          position: 'middle',
          cssClass: "ToastWarning",
          dismissOnPageChange: true
        });
      toast.present();
    }
  }

  confirmarCerrarSesion() {
    let alert = this.alertCtrl.create({
      title: 'Cerrar sesión',
      message: '¿Desea cerrar la sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar clickeado');
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            console.log('Confirmar clickeado');
            this.authAf.auth.signOut();
            this.navCtrl.setRoot(LoginPage);
          }
        }
      ]
    });
    alert.present();
  }
}
