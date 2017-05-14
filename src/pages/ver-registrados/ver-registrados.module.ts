import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VerRegistrados } from './ver-registrados';

@NgModule({
  declarations: [
    VerRegistrados,
  ],
  imports: [
    IonicPageModule.forChild(VerRegistrados),
  ],
  exports: [
    VerRegistrados
  ]
})
export class VerRegistradosModule {}
