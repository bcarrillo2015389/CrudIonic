import { Component, OnInit } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LoadingController } from '@ionic/angular';
// Plugins
import { Storage } from '@ionic/storage';

import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  cargando:any;

  public appPages = [
    {
      title: 'Inicio',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Mi perfil',
      url: '/perfil',
      icon: 'person'
    },{
      title:'Ver mi CV',
      url:'/cv',
      icon:'document'
    },
    {
      title:'Cerrar sesión',
      url: '/login',
      icon: 'lock'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private router: Router,
    private menuCtrl: MenuController,
    private loading:LoadingController
  ) {
    this.initializeApp();
  }

  ngOnInit(){
    
  };

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // User validation
      this.validationUser();
    });
  }

  async redireccionar(accion:string){

    if(accion=='/login'){
      
      await this.presentLoading("Cerrando sesión");
      await this.storage.clear();
      await this.cargando.dismiss();
      this.menuCtrl.enable(false);
      this.router.navigateByUrl('/login');

    }else if(accion=='/home'){
      this.router.navigateByUrl('/home');
    }else if(accion=='/list'){
      this.router.navigateByUrl('/list');
    }else if(accion=='/cv'){
      this.router.navigateByUrl('/cv');
    }else if(accion=='/perfil'){
      this.router.navigateByUrl('/perfil');
    }

  }

  validationUser(){
    this.storage.get('user').then((user) => {
      if (user) {
        console.log('existe');
        this.router.navigateByUrl('/');
      }else{
        this.router.navigateByUrl('/login');
        this.menuCtrl.enable(false);
      }

    });
  }

  async presentLoading(mensaje:string) {
    this.cargando = await this.loading.create({
    message: mensaje
  });
  return this.cargando.present();
  }
}
