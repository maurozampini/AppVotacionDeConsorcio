import { Component ,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { AngularFireModule} from 'angularfire2';
import { AngularFireAuthModule,AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { Chart } from 'chart.js';
import { ContactPage } from '../contact/contact';
import { LoginPage } from '../login/login';



@IonicPage()
@Component({
  selector: 'page-menu-vota',
  templateUrl: 'menu-vota.html',
})
export class MenuVotaPage {

  usuarioIngresado:string;
  list: FirebaseListObservable<any>;
  Mensaje:string;
  Voto:boolean;
  data:any;
  contadorPlanta:number ;
  contadorMatafuegos:number ;
  

  @ViewChild('doughnutCanvas') doughnutCanvas;

  doughnutChart: any;

  constructor(public navCtrl: NavController,
               public navParams: NavParams,
               db:AngularFireDatabase, 
               public alertCtrl: AlertController,
               private authAf: AngularFireAuth)
  {
    
    this.contadorPlanta = 0;
    this.contadorMatafuegos = 0;
    this.Voto = false;
    this.usuarioIngresado = navParams.get("usuario");
    this.list=db.list('/Votacion');

    db.list('/Votacion', { preserveSnapshot: true})
    .subscribe(snapshots=>{
        snapshots.forEach(snapshot => {

             if(snapshot.val().mensaje == "Plantas")
                this.contadorPlanta += 1;
              else
                this.contadorMatafuegos += 1;

              if(snapshot.val().usuario == this.usuarioIngresado)
                  this.Voto= true;

        });
    });

    
  }



  votoPlanta()
  {
      
    if(!this.Voto)
    { 
      this.contadorPlanta = 0;
      this.contadorMatafuegos = 0;
      this.Mensaje="Voto por poner plantas";
      this.list.push({
      usuario:this.usuarioIngresado,
      mensaje:"Plantas"});
    }
    else
    {
      this.Mensaje="Este usuario ya voto";
    
    }

    let alert = this.alertCtrl.create({
      title: "Votacion",
      subTitle: this.Mensaje,
      buttons: ['OK']
    });
    alert.present();

    this.Grafico();
  }

  votaMatafuego()
  {

   
    if(!this.Voto)
    { 
      this.contadorPlanta = 0;
      this.contadorMatafuegos = 0;
      this.Mensaje="Voto por poner matafuegos";
      this.list.push({
      usuario:this.usuarioIngresado,
      mensaje:"Matafuegos"});
    }
    else
    {
      this.Mensaje="Este usuario ya voto";
    }

    let alert = this.alertCtrl.create({
      title: "Votacion",
      subTitle: this.Mensaje,
      buttons: ['OK']
    });
    alert.present();

    this.Grafico();
  }




  ionViewDidLoad() {

     }

     Grafico()
     {
       this.navCtrl.push(ContactPage);
      // this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
        
      //              type: 'doughnut',
      //              data: {
      //                  labels: ["Plantas", "Matafuegos",],
      //                  datasets: [{
      //                      label: '# of Votes',
      //                      data: [this.contadorPlanta, this.contadorMatafuegos],
      //                      backgroundColor: [
      //                          'rgba(255, 99, 132, 0.2)',
      //                          'rgba(54, 162, 235, 0.2)'
   
      //                      ],
      //                      hoverBackgroundColor: [
      //                          "#FF6384",
      //                          "#36A2EB"
      //                      ]
      //                  }]
      //              }
        
      //          });
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
