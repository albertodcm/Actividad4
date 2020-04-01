import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NavController, ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private authServ: AuthService,
              private nav: NavController,
              private modalController: ModalController) {}

  myDate: string = new Date().toISOString();

  async openModal() {
    const modal = await this.modalController.create({
      component: ModalPage,

    });
    modal.present();
  }
  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  signOut() {
    this.authServ.logout();
  }

  deleteNote() {

  }
}

