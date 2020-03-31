import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any;

  constructor(private afa: AngularFireAuth,
              private navCtrl: NavController) {}

  setUser(user):void {
    localStorage.setItem('user', JSON.stringify(user));
    this.user = user;
  }

  clearUser(): void {
    localStorage.removeItem('user');
    this.user = null;
  }

  login(email: string, password: string): void {
    this.afa.auth.signInWithEmailAndPassword(email, password).then((credentials) => {
      this.setUser(credentials.user);

      this.navCtrl.navigateForward(['/home']);
    }).catch((error) => {
      console.log(error);
    })
  }

  logout(): void{
    this.afa.auth.signOut().then(()=> {
      this.clearUser();
      this.navCtrl.navigateRoot(['']);
    }).catch((error) => {
      console.log(error);
    });
  }

  isLoggedIn(): boolean {
    const user = localStorage.getItem('user');
    return (user!== null && user!== undefined);
  }
}
