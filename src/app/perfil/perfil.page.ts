import {
  Component,
  OnInit
} from '@angular/core';
import {
  PerfilService
} from '../perfil.service';
import {
  LoadingController
} from '@ionic/angular';
import {
  Storage
} from '@ionic/storage';
import {
  Router
} from '@angular/router';

import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  usuario: string;
  nombre: string;
  mail: string;
  telefono: string;
  usu: string;
  idioma: string;
  foto: string;
  actualizado:boolean;
  ajustado:boolean;

  cargando: any;
  usuarioValidado: boolean;

  constructor(private perfilService: PerfilService, private storage: Storage, private router: Router, private loading: LoadingController
    , public alertController: AlertController) {}

  async ngOnInit() {
    await this.presentLoading("Cargando");
    await this.validationUser();
  }

  async validationUser() {
    await this.storage.get('user').then((user) => {
      console.log(user);
      this.getPerfil(user.codigo);
    });
  }

  async getPerfil(id: string) {
    await this.perfilService.handleGetPerfil(id)
      . subscribe(res => {
        this.usuario = res.data.usuario;
        this.nombre = res.data.nombre;
        this.mail = res.data.mail;
        this.telefono = res.data.telefono;
      }, err => {
        console.log(err);
      });

    await this.perfilService.handleGetPassword(id)
      .subscribe(res => {
        this.usu = res.data.usu;
      }, err => {
        console.log(err);
      });

    await this.perfilService.handleGetAjustes(id)
      .subscribe(res => {
        this.idioma = res.data.idioma;
      }, err => {
        console.log(err);
      });

    await this.perfilService.handleGetFoto(id)
      .subscribe(res => {
        this.foto = res.data.url_foto;
        this.cargando.dismiss();
        this.usuarioValidado = true;
        
      }, err => {
        console.log(err);
      });
  }

  async presentLoading(mensaje: string) {
    this.cargando = await this.loading.create({
      message: mensaje
    });
    return this.cargando.present();
  }

  perfilUsuario(){
    this.actualizado = false;
    this.ajustado=false;
    this.usuarioValidado=true;
  }

  async actualizar(){
    await this.presentLoading("Cargando");
    this.actualizado = true;
    this.ajustado=false;
    this.usuarioValidado=false;
    this.cargando.dismiss();
  }

  ajustes(){
    this.ajustado = true;
    this.usuarioValidado=false;
    this.actualizado=false;
  }

  async guardarActualizacion(){
    await this.presentLoading("Actualizando");
    await this.perfilService.handleUpdatePerfil(this.usuario,this.nombre,this.mail,this.telefono)
      . subscribe(res => {
        if(res.status){
          this.cargando.dismiss();
          this.presentAlert('ACTUALIZADO', 'Su perfil ha sido actualizado con éxito.');
          this.perfilUsuario();
        }else{
          this.cargando.dismiss();
          this.presentAlert('ERROR', res.message);
        }
      }, err => {
        console.log(err);
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

  async regresarPerfil(){
    await this.presentLoading("Regresando");
    this.validationUser();
  }
}