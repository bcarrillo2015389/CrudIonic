import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

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

  constructor(private _sericeLogin:LoginService, public alertController: AlertController, private storage: Storage, private router: Router) { }

  ngOnInit() {}

  async handleLoginUser() {
      let data = { 'email': this.user, 'password': this.pass };

      await this._sericeLogin.handleUserLoginG(data)
        .subscribe(res => {
          if (res.status) {
            this.presentAlert('Se logeo', 'Bienvenido');
            this.storage.set('user', res.data);
            this.router.navigateByUrl('/');
          }else{
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

}
