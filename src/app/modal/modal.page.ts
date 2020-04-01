import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Nota } from 'src/models/nota.model';
import { AngularFireDatabase, AngularFireList  } from '@angular/fire/database';
import { Reminder, NotaService } from '../services/nota.service';
import { ActivatedRoute } from '@angular/router';
// import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
// import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  reminder: Reminder = {
    texto: 'Remindeeeerr',
    status: true
  };

  reminderId = null;

  constructor(public modalCtrl: ModalController,
              public database: AngularFireDatabase,
              private notaService: NotaService,
              private route: ActivatedRoute,
              private navc: NavController,
              ) { }

  ngOnInit() {
    this.reminderId = this.route.snapshot.params['id'];
    if (this.reminderId) {
      this.showReminder();
    }
  }

  showReminder() {
    this.notaService.getReminder(this.reminderId).subscribe(res => {
      this.reminder = res;
    });
  }

  createReminder() {
    if (this.reminderId) {
      this.notaService.updateReminder(this.reminder, this.reminderId).then(() => {
        this.navc.navigateBack('home');
      });
    } else {
      this.notaService.addReminder(this.reminder).then(() => {
        this.navc.navigateBack('home');
      });
    }
  }


  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }



}

