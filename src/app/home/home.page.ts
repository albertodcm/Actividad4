import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ModalController, NavController, IonSegment } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  status: string;


  constructor(private authServ: AuthService,
              public navCtrl: NavController,
              private modalController: ModalController) {}


  myDate: string = new Date().toISOString();

  value = 'todo';

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    this.status = 'todo';
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: ModalPage,

    });
    modal.present();
  }
  segmentChanged( ev: any ) {

    console.log('Segment changed', ev);
  }

  signOut() {
    this.authServ.logout();
  }

  deleteNote() {

  }
}

