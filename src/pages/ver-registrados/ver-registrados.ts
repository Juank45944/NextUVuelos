import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { Http, Headers } from "@angular/http";
import 'rxjs/add/operator/map';


@IonicPage()
@Component({
  selector: 'page-ver-registrados',
  templateUrl: 'ver-registrados.html',
})
export class VerRegistrados {

  url: string;
  headers: Headers;
  registrados: any[];
  datosVuelo: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController) {
    this.headers = new Headers();
    this.headers.append("X-Parse-REST-API-Key", "restAPIKey");
    this.headers.append("X-Parse-Master-Key", "masterKey");
    this.headers.append("X-Parse-Application-Id", "Lista1");

    this.getRegistrados(null);
  }

  getRegistrados(event) {
    let loader = this.loadingCtrl.create();
    loader.present();
    this.url = "http://localhost:8080/lista/classes/Vuelos_registrados";
    this.http.get(this.url, { headers: this.headers })
      .map(res => res.json())
      .subscribe(
      res => {
        loader.dismiss();
        this.registrados = res.results;
        if (event !== null)
          event.complete()
      },
      err => {
        this.alertCtrl.create({
          title: "Error",
          message: err,
          buttons: [{
            text: "Aceptar"
          }]
        }).present()
      }
      )
  }

  editRegistrado(vuelo){
    this.alertCtrl.create({
      title: "Editar Registro",
      message: "Modifica la información del registro aquí",
      inputs: [
        {
          name: "nombre",
          placeholder: "Nombre",
          value: vuelo.nombre
        },
        {
          name: "email",
          placeholder: "Email",
          value: vuelo.email
        },
        {
          name: "telefono",
          placeholder: "Teléfono",
          value: vuelo.telefono
        }
      ],
      buttons: [
        {
          text: "Cancelar"
        },
        {
          text: "Guardar",
          handler: data => {
            this.url = 'http://localhost:8080/lista/classes/Vuelos_registrados/' + vuelo.objectId;

            this.http.put(this.url, { nombre: data.nombre, email: data.email, telefono: data.telefono, vueloId: vuelo.vueloId }, { headers: this.headers })
              .map(res => res.json())
              .subscribe(
              res => {
                this.toastCtrl.create({
                  message: "Los datos del registro se han actualizado",
                  duration: 3000,
                  position: "middle"
                }).present()
                this.getRegistrados(null);
              },
              err => {
                this.toastCtrl.create({
                  message: "Ha ocurrido un error, inténtelo de nuevo",
                  duration: 3000,
                  position: "middle"
                }).present()
              }
              )
          }
        }
      ]
    }).present();

  }

  deleteRegistrado(vuelo){
    this.alertCtrl.create({
      title: "Eliminar Registro",
      message: "¿Estás seguro de eliminar este registro?",
      buttons: [
        { text: "No" },
        {
          text: "Si",
          handler: () => {
            this.url = 'http://localhost:8080/lista/classes/Vuelos_registrados/' + vuelo.objectId;
            this.http.delete(this.url, { headers: this.headers })
              .map(res => res.json())
              .subscribe(
              res => {
                this.toastCtrl.create({
                  message: "El registro se ha eliminado",
                  duration: 3000,
                  position: "middle"
                }).present()
                this.getRegistrados(null);
              }, err => {
                this.toastCtrl.create({
                  message: "Ha ocurrido un error, inténtelo de nuevo",
                  duration: 3000,
                  position: "middle"
                }).present()
              }
              )

          }
        }
      ]
    }).present()
  }




}
