import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

// Provider
import { LoginService } from '../login.service';

// Plugins
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  
  // Values Login
  user:string;
  pass:string;
  cargando:any;

  constructor(private _sericeLogin:LoginService, public alertController: AlertController, 
    private storage: Storage, private router: Router, private menuCtrl:MenuController, private loading:LoadingController) { }

  ngOnInit() {}

  async handleLoginUser() {
      let data = { 'email': this.user, 'password': this.pass };
      this.presentLoading("Cargando");
      await this._sericeLogin.handleUserLoginG(data)
        .subscribe(res => {
          if (res.status) {
            this.storage.set('user', res.data);
            this.cargando.dismiss();
            this.menuCtrl.enable(true);
            this.user=undefined;
            this.pass=undefined;
            
            this.router.navigateByUrl('/');
          }else{
            this.cargando.dismiss();
            this.presentAlert('Algo salio mal', res.message)
          }
          console.log(res);
        }, err => {
          console.log('Error', err);
        }); 
  }



  // UTILS
  async presentAlert(title:string, message:string) {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: ['Aceptar']
    });

    await alert.present();
  }

  async presentLoading(mensaje:string) {
      this.cargando = await this.loading.create({
      message: mensaje
    });
    return this.cargando.present();
  }

}
