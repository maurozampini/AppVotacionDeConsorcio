import { Component ,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { AngularFireModule} from 'angularfire2';
import { AngularFireAuthModule,AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { Chart } from 'chart.js';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  usuarioIngresado:string;
  list: FirebaseListObservable<any>;
  Mensaje:string;
  Voto:boolean;
  data:any;
  contadorPlanta:number ;
  contadorMatafuegos:number ;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    db:AngularFireDatabase, 
    public alertCtrl: AlertController) {

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

  @ViewChild('doughnutCanvas') doughnutCanvas;
  
    doughnutChart: any;



  ionViewDidLoad() {
    
        this.Grafico();
    
         }

  Grafico()
  {
   this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
     
                type: 'doughnut',
                data: {
                    labels: ["Plantas", "Matafuegos",],
                    datasets: [{
                        label: '# of Votes',
                        data: [this.contadorPlanta, this.contadorMatafuegos],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)'

                        ],
                        hoverBackgroundColor: [
                            "#FF6384",
                            "#36A2EB"
                        ]
                    }]
                }
     
            });
  }

}
