import { Component, OnInit } from '@angular/core';

// Services 
import { JugadoresService } from '../jugadores.service';

import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

  players;

  // Validation View
  listUser:boolean = true;
  createUser:boolean = false;

  constructor(private _playersService: JugadoresService, public alertController: AlertController) {}

  ngOnInit() {
    this.getPlayers();
  }

  handleCreateUser(){
    this.listUser = false;
    this.createUser = true;
  }

  handleListUser(){
    this.listUser = true;
    this.createUser = false;
  }

  async getPlayers(){
    await this._playersService.handleGetDataPlayers()
      .subscribe(res => {
        this.players = res.data;
        console.log(res);
      }, err => {
        console.log('Error', err);
      }); 
  }

  handleDeleteUser(id_user:string){
    console.log('usuario', id_user);
  }

  handleUpdateUser(id_user:string){
    console.log('usuario', id_user);
  }

  async handleGetPositions(id_user:string){
    await this._playersService.getPosicion()
      .subscribe(res => {
        this.players = res.data;
        this.presentAlertCheckbox(res.data);
        console.log(res);
      }, err => {
        console.log('Error', err);
      }); 
  }

  async presentAlertCheckbox(data) {

    let dataCheck = [];
    data.forEach(posicion => {
      let objCheck = {
        name: `${posicion.codigo}`,
        type: 'checkbox',
        label: posicion.nombre,
        value: posicion.codigo,
      }

      dataCheck.push(objCheck);
    });

    console.log(dataCheck[0]);

    const alert = await this.alertController.create({
      header: 'Checkbox',
      inputs: dataCheck,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            console.log(data);
          }
        }
      ]
    });

    await alert.present();
  }


}
