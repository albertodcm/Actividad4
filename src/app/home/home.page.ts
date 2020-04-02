import { Component, ViewChild, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ModalController, NavController, IonSegment } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { NotaService } from '../services/nota.service';
import { Reminder } from 'src/models/Reminder.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  reminders: Reminder[];

  status: 'todo';


  constructor(private authServ: AuthService,
              public navCtrl: NavController,
              private modalController: ModalController,
              private notaService: NotaService) {}


  myDate: string = new Date().toISOString();

  // value = 'todo';

  ngOnInit() {
    this.getReminders();
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: ModalPage,

    });
    modal.present();
  }

  getReminders() {
    this.notaService.getReminders().subscribe(res => {
      this.reminders = res;
    });
  }

  segmentChanged( ev: any ) {
    console.log('Segment changed', ev);
  }

  signOut() {
    this.authServ.logout();
  }

  deleteReminder(pos: any) {
    console.log('entro a deleteReminder');
    this.notaService.removeReminder('lVH9rQE3TqzSjd28YeI7');
  }
}

