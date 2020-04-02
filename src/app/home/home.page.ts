import { Component, ViewChild, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ModalController, NavController, IonSegment, AlertController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { NotaService } from '../services/nota.service';
import { Reminder } from 'src/models/Reminder.model';
import { EditPage } from '../edit/edit.page';

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
              private notaService: NotaService,
              public alertController: AlertController) {
              this.status = 'todo';
              }


  myDate: string = new Date().toISOString();

  ngOnInit() {
    this.getReminders();
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: ModalPage,
    });
    modal.present();
  }
  async openEdit() {
    const modal = await this.modalController.create({
      component: EditPage,
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
    this.notaService.removeReminder(pos);
    this.deleteAlert('Success!', 'Your To-Do has been deleted successfully');
  }

  async deleteAlert(header, subHeader) {

    const alert = await this.alertController.create({
      header,
      subHeader,
      buttons: ['OKAY']
    });
    await alert.present();
  }
}

