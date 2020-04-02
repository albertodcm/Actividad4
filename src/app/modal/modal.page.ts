import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController} from '@ionic/angular';
import { Reminder } from 'src/models/Reminder.model';
import { NotaService } from '../services/nota.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  crear2: boolean;

  reminder: Reminder = {
    id: null,
    texto: null,
    status: null
  };

  constructor(public modalCtrl: ModalController,
              private notaService: NotaService,
              public alertController: AlertController,) { }

  ngOnInit() {
    this.crear2 = this.notaService.crear;
  }

  createReminder() {
    this.notaService.addReminder(this.reminder).then(() => {
      console.log('Reminder creado');
      this.dismiss();
    }).catch((error) => {
      console.log(error);
    });
    this.createAlert('Success!', 'Your To-Do has been created successfully');
  }

  updateReminder(this, id) {
    console.log('Entro a update 1');
    this.notaService.updateReminder(this.reminder, this.id).then(() => {
      this.dismiss();
      });

    }

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

  async createAlert(header, subHeader) {

    const alert = await this.alertController.create({
      header,
      subHeader,
      buttons: ['OKAY']
    });
    await alert.present();
  }
}
