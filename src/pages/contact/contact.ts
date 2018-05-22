import { Component, ViewChild, Inject } from '@angular/core';
import { NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Chart } from 'chart.js';
import { MenuVotaPage } from '../menu-vota/menu-vota';

@Component({
    selector: 'page-contact',
    templateUrl: 'contact.html'
})
export class ContactPage {
    ganador: string;
    platform: any;
    selectedItem: any;
    usuarioIngresado: string;
    list: FirebaseListObservable<any>;
    Mensaje: string;
    Voto: boolean;
    data: any;
    contadorPlanta: number;
    contadorMatafuegos: number;
    @ViewChild('doughnutCanvas') doughnutCanvas;
    doughnutChart: any;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        db: AngularFireDatabase,
        public alertCtrl: AlertController,
        @Inject(Platform) platform) {

        this.navParams = navParams;
        this.selectedItem = navParams.get('item');
        this.platform = platform;
        console.log(this.platform);
        this.platform.registerBackButtonAction(() => { this.navCtrl.setRoot(MenuVotaPage) });

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

        if (this.contadorMatafuegos > this.contadorPlanta) {
            this.ganador = "¡Gana Matafuego!";
        }
        else if (this.contadorMatafuegos < this.contadorPlanta) {
            this.ganador = "¡Gana Planta!";
        }
        else {
            this.ganador = "¡Empate!"
        }
    }

    ionViewDidLoad()
    {
        this.Grafico();
    }

    Grafico() {
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
