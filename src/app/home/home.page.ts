import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private authServ: AuthService) {}

  myDate: string = new Date().toISOString();

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  signOut() {
    this.authServ.logout();
  }
}

