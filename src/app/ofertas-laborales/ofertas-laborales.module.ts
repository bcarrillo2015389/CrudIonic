import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OfertasLaboralesPage } from './ofertas-laborales.page';

const routes: Routes = [
  {
    path: '',
    component: OfertasLaboralesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OfertasLaboralesPage]
})
export class OfertasLaboralesPageModule {}
