import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Storage } from '@ionic/storage';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { CameraService } from 'src/app/services/camera/camera.service';
import { UtilService } from 'src/app/services/util/util.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  user : User = new User;
  
  constructor(private utilService: UtilService, private auth : AuthService, private storage: Storage, private userService: UserService, private router: Router, private camera: CameraService) {
   this.userService.getUser().valueChanges().subscribe(data => { 
     console.log('current user: ', data);
     console.log('pwd: ', data.password, ' email: ', data.email,' key: ', data.key,' name: ',  data.name, data.picture); 
     this.user = data 
    
    });
   }

  //logout
  logout() : void {
    this.storage.clear();
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }

  //update profile image
  update() : void {
    this.camera.updatePicture().then(value => {
      console.log('update: ', value);
      this.utilService.doToast('Sucess', 'Your Image Is Updated')
    }).catch(err => this.utilService.doAlert('Error', 'This feature only works on Mobiles', 'OK'));
  }

  ngOnInit(): void {
  }

}
