import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UtilService } from 'src/app/services/util/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm : FormGroup; 

  constructor(
    private auth : AuthService,
    private uitil : UtilService,
    private fb : FormBuilder,
    private storage: Storage,
    private router: Router) { 


     }

  createFrom() : void {
    this.loginForm = this.fb.group({
      email : ['', Validators.compose([Validators.required, Validators.email])],
      password : ['', Validators.required]
    }); 
  }    

  sigin() : void {
    console.log('form', this.loginForm.value);
    this.auth.sigin(this.loginForm.value).then(data => {
      console.log('uid sigin: ', JSON.stringify(data.user.uid));
      this.storage.set('uid', JSON.stringify(data.user.uid));
      this.router.navigateByUrl('/tabs');
    },(reason) => {
      this.uitil.doAlert("Error", reason, "Ok");
      this.router.navigateByUrl('/login');
    });
  }

  ngOnInit() {
    this.createFrom();
  }

}