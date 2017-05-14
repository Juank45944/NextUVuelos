import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http, Headers } from "@angular/http";
import { Vuelo } from "../../vuelo-model";
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-ver-vuelos',
  templateUrl: 'ver-vuelos.html',
})
export class VerVuelos {

  vuelos_disponibles: Vuelo[];
  fechaBuscada: string;
  horaBuscada: string;
  headers: Headers;
  url: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public alertCtrl: AlertController) {
    this.headers = new Headers();
    this.headers.append("X-Parse-REST-API-Key", "restAPIKey");
    this.headers.append("X-Parse-Master-Key", "masterKey");
    this.headers.append("X-Parse-Application-Id", "Lista1");

    this.fechaBuscada = navParams.get('fechaBuscada');
    this.horaBuscada = navParams.get('horaBuscada');

    this.getVuelos();
  }

  getVuelos() {
    this.url = 'http://localhost:8080/lista/classes/Vuelos_disponibles?where={"fecha": "'+this.fechaBuscada+'"}';

    this.http.get(this.url, { headers: this.headers})
      .map(res=>res.json())
      .subscribe(
        res=>{
          this.vuelos_disponibles = res.results;
          if (this.vuelos_disponibles.length<1) {
            this.alertCtrl.create({
              title: "Ups!",
              message: "Al parecer no hay vuelos en la fecha buscada",
              buttons: [{
                text: "Nueva búsqueda",
                handler: () => {
                  this.navCtrl.pop();
                }
              }]
            }).present()
          }
        },
        err=>{
          this.alertCtrl.create({
            title: "Error",
            message: "Ha ocurrido un error, inténtelo de nuevo",
            buttons: [{
              text: "Aceptar"
            }]
          }).present()
        }
      )
  }

  irHome() {
    this.navCtrl.pop();
  }



}
