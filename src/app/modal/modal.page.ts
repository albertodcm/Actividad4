import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Nota } from 'src/models/nota.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  nota = {} as Nota;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  createNote(input: HTMLInputElement) {
    console.log('sirveeeeeee');
  }
}
