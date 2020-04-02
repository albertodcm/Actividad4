import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  constructor(private navCtrl: NavController,
              private authService: AuthService,
              public alertController: AlertController) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = new FormGroup ({
      email: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(5)])
    });
  }

  onSubmit(): void {

    const email = this.loginForm.controls.email.value;
    const pwd = this.loginForm.controls.password.value;

    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.authService.login(email, pwd);

    } else {
      console.log('error');
      if (email === '' || pwd === '' || email === null || pwd === null) {
        this.loginAlert('Error!', 'Please fill the email and password fields.');
      } else {
        this.loginAlert('Error!', 'Your credentials are incorrect. Please try again');
      }
    }
  }
  async loginAlert(header, subHeader) {

    const alert = await this.alertController.create({
      header,
      subHeader,
      buttons: ['OKAY']
    });
    await alert.present();
  }
}
