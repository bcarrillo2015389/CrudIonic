import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

// Plugins
import { Storage } from '@ionic/storage';

import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Principal',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Opciones',
      url: '/list',
      icon: 'list'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // User validation
      this.validationUser();
    });
  }

  validationUser(){
    this.storage.get('user').then((user) => {
      if (user) {
        console.log('existe');
        this.router.navigateByUrl('/');
      }else{
        this.router.navigateByUrl('/login');
      }

    });
  }

}
