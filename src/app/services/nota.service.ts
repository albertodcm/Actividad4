import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import { Reminder } from 'src/models/Reminder.model';

@Injectable({
  providedIn: 'root'
})

export class NotaService {

  constructor(private afs: AngularFirestore) {}

  addReminder(reminder: Reminder) {
    reminder.id = this.afs.createId();
    reminder.status = 'todo';
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
    return this.afs.collection('reminder').doc(id).valueChanges();
  }

  updateReminder(id: string, reminder: Reminder) {
    return this.afs.collection('reminder').doc(id).update(reminder);
  }

  removeReminder(id: string) {
    console.log('entro a deleteReminder service');
    return this.afs.collection('reminder').doc(id).delete();
  }
}
