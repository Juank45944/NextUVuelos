import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Http, Headers } from "@angular/http";
import { Vuelo } from "../../vuelo-model";
import { VerVuelos } from "../ver-vuelos/ver-vuelos";
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  vuelo: Vuelo = {
    fecha: "",
    hora: ""
  }
  url: string;
  headers: Headers;

  constructor(public navCtrl: NavController, public http: Http, public alertCtrl: AlertController) {
    this.headers = new Headers();
    this.headers.append("X-Parse-REST-API-Key", "restAPIKey");
    this.headers.append("X-Parse-Master-Key", "masterKey");
    this.headers.append("X-Parse-Application-Id", "Lista1");
  }

  buscarVuelo() {
    this.url = "http://localhost:8080/lista/classes/Vuelos_buscados";
    this.http.post(this.url, {fecha: this.vuelo.fecha, hora: this.vuelo.hora}, { headers: this.headers})
      .map(res => res.json())
      .subscribe(
        res => {
          this.navCtrl.push(VerVuelos, {
            fechaBuscada: this.vuelo.fecha,
            horaBuscada: this.vuelo.hora
          })
        },
        err => {
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

}
