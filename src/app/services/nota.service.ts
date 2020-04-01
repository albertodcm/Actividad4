import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotaService {

  constructor(private afs: AngularFirestore) { }

  createNote(note: any) {
    return this.afs.collection('note').add(note);
  }

  // No sé si funciona
  deleteNote(noteId: string) {
    return this.afs.doc(`note/${noteId}`).delete();
  }

  updateNote(noteId: string, updatednote: any) {
    return this.afs.doc(`note/${noteId}`).update(updatednote);
  }
  getNotes() {
    return this.afs.collection('note').snapshotChanges().pipe(
      map(docs => docs.map(doc => {
        const note = doc.payload.doc.data() as any;
        const id = doc.payload.doc.id;

        return {id, ...note};
      }))
    );
  }

  getNote(noteId: string) {
    return this.afs.doc(`note/${noteId}`).snapshotChanges().pipe(
      map(doc => {
        const note = doc.payload.data() as any;
        const id = doc.payload.id;

        return {id, ...note};
      })
    );
  }

}
