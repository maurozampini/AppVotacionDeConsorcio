import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { RegisterPage } from '../register/register';
import { AlertController, LoadingController, Loading, ToastController } from 'ionic-angular';
import { MenuVotaPage } from '../menu-vota/menu-vota';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage
{
  platform: any;
  selectedItem: any;
  username: string;
  password: string;
  tipoUser: string;
  splash = true;
  
  constructor(public spiner: LoadingController,
              public navCtrl: NavController,
              public navParams: NavParams,
              private afAuth: AngularFireAuth,
              public alertCtrl: AlertController,
              private toastCtrl: ToastController,
              @Inject(Platform) platform)
              {
                this.navParams = navParams;
                this.selectedItem = navParams.get('item');
                this.platform = platform;
                console.log(this.platform);
                this.platform.registerBackButtonAction(() => { this.platform.exitApp() }); //Instrucción para cerrar la app al tocar backbutton
              }

  async login()
  {
    if(this.username == null || this.password == null || this.password == '' || this.username == '')
      {
        this.showAlert("Debe completar el Email y su Clave para ingresar", "Campo vacio!");
      }

      else
      {
        let espera = this.MiSpiner();
        espera.present();    
        await this.afAuth.auth.signInWithEmailAndPassword(this.username,this.password)
              .then(result => 
                {
                  espera.dismiss();
                  this.navCtrl.setRoot(MenuVotaPage, { usuario: this.username })
                })
              .catch(error =>
                {
                  espera.dismiss();
                  setTimeout(() => {
                    this.showAlert(error.message, "Error al ingresar!");
                   }, 500);
                })
      }
  }

  UserValido()
  {
    switch(this.tipoUser)
    {
      case "admin":
        this.username = "admin@admin.com";
        this.password = "111111";
        break;
      case "usuario":
        this.username="usuario@usuario.com";
        this.password="333333";
        break;
      case "invitado":
        this.username="invitado@invitado.com";
        this.password="222222";
        break;              
      case "jugador1":
        this.username="j1@jugador.com";
        this.password="444444";
        break;
      case "jugador2":
        this.username="j2@jugador.com";
        this.password="555555";
        break;     
    }
  }  

  showAlert(mensaje: string, titulo: string)
  {
    switch(mensaje)
    {
      case "The email address is badly formatted.":
      {
        mensaje = "El email no contiene un formato correcto";
        break;
      }
      case "The password is invalid or the user does not have a password.":
      {
        mensaje = "La clave es incorrecta, intente nuevamente";
      }
    }
    
    let toast = this.toastCtrl.create(
    {
      message: mensaje,
      duration: 2000,
      position: 'middle',
      cssClass: "ToastWarning",
      dismissOnPageChange: true
    });
    toast.present();
  }  

Registrarse()
{
  this.navCtrl.push(RegisterPage);
}

ionViewDidLoad() {
  setTimeout(() => this.splash = false, 4000);
}

MiSpiner(): Loading
{
  let loader = this.spiner.create(
  {
    content: "Espere...",
    duration: 2500
    });
    return loader;
  }
}
