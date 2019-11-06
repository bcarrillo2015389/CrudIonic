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
  jugador;
  name:string;
  equipo:string;
  numero:string;
  posicion:string;


  id_user:string;


  // Validation View
  listUser:boolean = true;
  createUser:boolean = false;
  updateUser:boolean = false;

  constructor(private _playersService: JugadoresService, public alertController: AlertController) {}

  ngOnInit() {
    this.getPlayers();
  }

  handleCreateUser(){
    this.listUser = false;
    this.createUser = true;
    this.updateUser=false;
    this.limpiarControles();
  }

  async llenarControles(id_user:string){
    await this.getPlayer(id_user);
  }

  async getPlayer(id_user:string){
    await this._playersService.handleGetDataPlayer(id_user)
      .subscribe(res => {
        this.name = res.data[0].nombre;
        this.equipo = res.data[0].equipo;
        this.numero = res.data[0].numero;
        this.posicion = res.data[0].posicion
        console.log(res.data[0].nombre);
      }, err => {
        console.log('Error', err);
      }); 
  }

  handleUpdateUser(id_user:string){
    this.listUser = false;
    this.createUser = false;
    this.updateUser=true;
    this.id_user=id_user;

    this.llenarControles(id_user);

  }

  handleListUser(){
    this.listUser = true;
    this.createUser = false;
    this.updateUser=false;
    this.limpiarControles();
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

  async handleDeleteUser(id_user:string){
    await this._playersService.deleteJugador(id_user).subscribe(res => {
      if(res.status==true){
        this.presentAlert('ELIMINADO', 'Jugador eliminado con éxito.');
        this.getPlayers();
      }else{
        this.presentAlert('ERROR', 'Algo salió mal, intente de nuevo.');
      }
    });
  }

  async handleUpdateJugador(){
    await this._playersService.updateJugador(this.id_user, this.name,this.equipo,this.numero,this.posicion).subscribe(res => {
      if(res.status==true){
        this.presentAlert('ACTUALIZADO', 'Jugador actualizado con éxito.');
        this.getPlayers();
        this.id_user=undefined;
        this.limpiarControles();
        this.jugador=undefined;
        this.handleListUser();
      }else{
        this.presentAlert('ERROR', 'Algo salió mal, intente de nuevo.');
      }
    });
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

  async presentAlert(title:string, message:string) {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: ['Aceptar']
    });

    await alert.present();
  }

  limpiarControles(){
    this.name=undefined;
    this.equipo=undefined;
    this.numero=undefined;
    this.posicion=undefined;
  }

   async handleAddJugador(){
    await this._playersService.postJugador(this.name,this.equipo,this.numero,this.posicion).subscribe(res => {
      if(res.status==true){
        this.presentAlert('GUARDADO', 'Jugador almacenado con éxito.');
        this.limpiarControles();
        this.getPlayers();
      }else{
        this.presentAlert('ERROR', 'Algo salió mal, intente de nuevo.');
      }
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
