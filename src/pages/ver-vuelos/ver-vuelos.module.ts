import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VerVuelos } from './ver-vuelos';

@NgModule({
  declarations: [
    VerVuelos,
  ],
  imports: [
    IonicPageModule.forChild(VerVuelos),
  ],
  exports: [
    VerVuelos
  ]
})
export class VerVuelosModule {}
