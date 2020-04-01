import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Reminder {
  texto: string;
  status: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class NotaService {

  private remindersCollection: AngularFirestoreCollection<Reminder>;

  private reminders: Observable<Reminder[]>;

  constructor(private afs: AngularFirestore) {
    this.remindersCollection = afs.collection<Reminder>('reminder');


    this.reminders = this.remindersCollection.snapshotChanges().pipe(
    map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    })
   );
  }

  getReminders() {
    return this.reminders;
  }

  getReminder(id) {
    return this.remindersCollection.doc<Reminder>(id).valueChanges();
  }

  updateReminder(reminder: Reminder, id: string) {
    return this.remindersCollection.doc(id).update(reminder);
  }

  addReminder(reminder: Reminder) {
    return this.remindersCollection.add(reminder);
  }

  removeReminder(id) {
    return this.remindersCollection.doc(id).delete();
  }

}