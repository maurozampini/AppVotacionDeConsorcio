import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireModule} from 'angularfire2';
import { AngularFireAuthModule,AngularFireAuth, } from 'angularfire2/auth';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {firebase}  from 'firebase/database';
import { LoginPage } from '../login/login';
import { AlertController, LoadingController ,Loading} from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  username:string;
  password:string;
  Mensaje:string;
  passwordconfirm:string;
  

  constructor(public spiner:LoadingController,
              public navCtrl: NavController,
               public alertCtrl: AlertController,
               public navParams: NavParams,
               private _auth:AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  async Aceptar()
  {
    
    if(this.password.length>5){
    if(this.password==this.passwordconfirm)
    try{
         this.MiSpiner();
        const result = await this._auth.auth.createUserWithEmailAndPassword(this.username,this.password);
    
        this.Mensaje=this.username + " Fue ingresado Exitosamente!"
        alert(this.Mensaje);
        this.navCtrl.push(LoginPage);
      }
      catch(e)
      {
     
        console.error(e);
        this.showAlert(e,"error al registrarse");
      }
    else
      {this.showAlert("las claves no coinciden , intente nuevamente","error al registrarse")}
  }
  else
    {

      this.showAlert("la clave debe contener por lo menos 6 caracteres","error al registrarse")
    }

  }
  showAlert(mensaje:string,titulo:string) {

    switch(mensaje)
    {
      
      case "The email address is badly formatted.":
      {

        mensaje="El email no contiene un formato correcto";
        break;
      }
     

    }
    let alert = this.alertCtrl.create({
      title: titulo,
      subTitle: mensaje,
      buttons: ['OK']
    });
    alert.present();
  }  

  MiSpiner()
  {
    let loader = this.spiner.create({
      content:"Espere..",
      duration: 2500
      
    });
      loader.present();
    
  }


  async Cancelar()
  {
    this.navCtrl.push(LoginPage);
  }

}
