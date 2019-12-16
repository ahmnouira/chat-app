import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Storage } from '@ionic/storage';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { CameraService } from 'src/app/services/camera/camera.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  user : User = new User;
  Currentimage: any; 

  constructor(private auth : AuthService, private storage: Storage, private userService: UserService, private router: Router, private camera: CameraService) {
   this.userService.getUser().valueChanges().subscribe(data => { 
     console.log('current user: ', data);
     console.log('pwd: ', data.password, ' email: ', data.email,' key: ', data.key,' name: ',  data.name, data.picture); 
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
    this.camera.getPicture();
  }

  ngOnInit() {
    
  }

}
