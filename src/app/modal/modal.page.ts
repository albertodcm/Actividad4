import { Component, OnInit } from '@angular/core';
import { ModalController} from '@ionic/angular';
import { Reminder } from 'src/models/Reminder.model';
import { NotaService } from '../services/nota.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  reminder: Reminder = {
    id: null,
    texto: null,
    status: null
  };

  constructor(public modalCtrl: ModalController,
              private notaService: NotaService) { }

  ngOnInit() {
  }

  createReminder() {
    this.notaService.addReminder(this.reminder).then(() => {
      console.log('Reminder creado');
      this.dismiss();
    }).catch((error) => {
      console.log(error);
    });
  }

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }
}
