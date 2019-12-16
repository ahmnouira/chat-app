import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AuthService } from '../services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user/user.service';
import { UtilService } from '../services/util/util.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm : FormGroup;

  constructor(private storage: Storage, private auth : AuthService, private userService: UserService, private util : UtilService, private fb : FormBuilder
      ,private router : Router
    ) { }

  createFrom() : void {
    this.registerForm = this.fb.group({
      email : ['', Validators.compose([Validators.required, Validators.email])],
      password : ['', Validators.required],
      name: ['', Validators.required]
    }); 
  }   

  createAccount() : void  {
    console.log('form', this.registerForm.value);
    let email : string =this.registerForm.value['email'];
    let msg : string = `Created account for: <b>${email}</b>`;
    console.log(msg);
      this.auth.createAccount(this.registerForm.value).then(data => {
        console.log('uid account: ', data.user.uid);
        this.storage.set('uid', JSON.stringify(data.user.uid));
        this.userService.createUser(this.registerForm.value);
        this.util.doAlert("Success", msg, "Ok" );
        this.router.navigateByUrl('/login');
      },(reason) => {
        this.util.doAlert("Error", reason, "Ok")
      });
  }

  ngOnInit() {
    this.createFrom();
  }

}
