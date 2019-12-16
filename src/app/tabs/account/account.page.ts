import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Storage } from '@ionic/storage';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  user : User = new User;

  constructor(private auth : AuthService, private storage: Storage, private userService: UserService, private router: Router) {
   this.userService.getUser().valueChanges().subscribe(data => { 
     console.log('current user: ', data);
     console.log(data.password, data.email, data.key, data.name); 
     this.user = data 
    
    });
   }

  //logout
  logout() {
    this.storage.clear();
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }

  //update profile image
  update() {
    alert('update image');
  }

  ngOnInit() {
    
  }

}
