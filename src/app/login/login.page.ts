import { Component, OnInit, createPlatformFactory } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { UserService } from '../services/user/user.service';
import { Storage } from '@ionic/storage';
import { UtilService } from '../services/util/util.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  loginForm : FormGroup; 

  constructor(
  
    private auth : AuthService,
    private userService : UserService,
    private uitil : UtilService,
    private fb : FormBuilder,
    private storage: Storage,
    private router: Router) {  }

     
  createFrom() : void {
    this.loginForm = this.fb.group({
      email : ['', Validators.compose([Validators.required, Validators.email])],
      password : ['', Validators.required],
      name : ['', Validators.required]
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

  createAccount() : void  {
    console.log('form', this.loginForm.value);
    let email : string =this.loginForm.value['email'];
    let msg : string = `Account Created: ${email}`;
    console.log(msg);
      this.auth.createAccount(this.loginForm.value).then(data => {
        console.log('uid account: ', data.user.uid);
        this.storage.set('uid', JSON.stringify(data.user.uid));
        this.userService.createUser(this.loginForm.value);
        this.uitil.doToast("Success", msg );
      },(reason) => {
        this.uitil.doAlert("Error", reason, "Ok")
      });
  }
  
  ngOnInit() {
    this.createFrom();
  }

}
