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
  equipos;
  posiciones;
  objEquipo;
  objPosicion;

  name:string;
  equipo:string;
  numero:string;
  posicion:string;


  id_user:string;


  // Validation View
  listUser:boolean = true;
  createUser:boolean = false;
  updateUser:boolean = false;
  choice:boolean = false;

  constructor(private _playersService: JugadoresService, public alertController: AlertController) {}

  ngOnInit() {
    this.getPlayers();
  }

  setEquipo(){
    this.equipo = this.objEquipo.codigo;
  }

  setPosicion(posicion:string){
    this.posicion=this.objPosicion.codigo;
  }

  handleCreateUser(){
    this.listUser = false;
    this.updateUser=false;
    this.getEquipos(false,undefined);
    this.getPosiciones(false,undefined);
    this.limpiarControles();
    this.createUser = true;
  }

  async llenarControles(id_user:string){
    await this.getPlayer(id_user);
  }

  async selectComboBox(obj){
    await this.getEquipos(true,obj);
    await this.getPosiciones(true,obj);
  }

  async getPlayer(id_user:string){
    await this._playersService.handleGetDataPlayer(id_user)
      .subscribe(res => {
        this.name = res.data[0].nombre;
        this.equipo = res.data[0].equipo;
        this.numero = res.data[0].numero;
        this.posicion = res.data[0].posicion;

        this.selectComboBox(res.data[0]);

        console.log(res.data[0].nombre);
      }, err => {
        console.log('Error', err);
      }); 
  }

  async handleUpdateUser(id_user:string){
    await this.llenarControles(id_user);
    this.listUser = false;
    this.createUser = false;
    this.id_user=id_user;
    this.updateUser=true;

  }

  handleListUser(){
    this.limpiarControles();
    this.createUser = false;
    this.updateUser=false;
    this.listUser = true;
  }

  async getEquipos(opcion:boolean,obj){
    await this._playersService.handleGetDataEquipos()
      .subscribe(res => {
        this.equipos = res.data;
        console.log(res);
        console.log(this.equipos);
        if(opcion){
          for(var i=0;i<this.equipos.length;i++){
            if(this.equipos[i].codigo==obj.equipo){
              this.objEquipo=this.equipos[i];
              console.log(this.objEquipo);
            }
          }
        }
      }, err => {
        console.log('Error', err);
      }); 
  }

  async getPosiciones(opcion:boolean,obj){
    await this._playersService.handleGetDataPosiciones()
      .subscribe(res => {
        this.posiciones = res.data;
        console.log(res);
        console.log(this.posiciones);
        if(opcion){
          
    for(var i=0;i<this.posiciones.length;i++){
      if(this.posiciones[i].codigo==obj.posicion){
        this.objPosicion=this.posiciones[i];
        console.log(this.objPosicion);
      }
    }
        }
      }, err => {
        console.log('Error', err);
      }); 
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

  async showMessageOkCancel(title, message) {
    const alert = await this.alertController.create({
        header: title,
        subHeader: message,
        buttons: [{
            text: 'Aceptar',
            handler: () => {
                this.choice=true;
            }
        }, {
            text: 'Cancelar',
            handler: () => {
                this.choice=false;
            }
        }]
    });

    await alert.present();
    await alert.onDidDismiss().then((data) => {
        console.log(data);
    })

    console.log(this.choice);
    return this.choice
}

  async handleDeleteUser(id_user:string){
    
    await this.showMessageOkCancel("ELIMINAR","¿Está seguro que desea eliminar el registro?");

    if(this.choice){
    await this._playersService.deleteJugador(id_user).subscribe(res => {
      if(res.status==true){
        this.presentAlert('ELIMINADO', 'Jugador eliminado con éxito.');
        this.getPlayers();
        this.choice=false;
      }else{
        this.presentAlert('ERROR', 'Algo salió mal, intente de nuevo.');
      }
    })}
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
    this.objEquipo=undefined;
    this.objPosicion=undefined;
  }

   async handleAddJugador(){
    await this._playersService.postJugador(this.name,this.equipo,this.numero,this.posicion).subscribe(res => {
      if(res.status==true){
        this.presentAlert('GUARDADO', 'Jugador almacenado con éxito.');
        this.limpiarControles();
        this.getPlayers();
        this.handleCreateUser();
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
