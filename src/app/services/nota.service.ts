import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import { Reminder } from 'src/models/Reminder.model';

@Injectable({
  providedIn: 'root'
})

export class NotaService {

  crear: boolean;
  reminder: Reminder;

  constructor(private afs: AngularFirestore) {}

  addReminder(reminder: Reminder) {
    reminder.id = this.afs.createId();
    reminder.status = 'todo';
    console.log('Creado 2');
    return this.afs.doc(`reminder/${reminder.id}`).set(reminder);
  }

  getReminders() {
    return this.afs.collection('reminder').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
     );
  }

  getReminder(id: string) {
    console.log('Entro a Get');
    return this.afs.collection('reminder').doc(id).valueChanges();
  }

  updateReminder(reminder: Reminder, id: string) {
    console.log(id);
    return this.afs.collection('reminder').doc(id).update(reminder);
  }

  removeReminder(id: string) {
    console.log('entro a deleteReminder service');
    return this.afs.collection('reminder').doc(id).delete();
  }

  todoneReminder(reminder: Reminder, id: string) {
    console.log('entro a todo done reminder');

    status = 'done';
    return this.afs.collection('reminder').doc(id).update(reminder);

  }
}

