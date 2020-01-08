import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { ChatsService } from 'src/app/services/chats/chats.service';
import { UtilService } from 'src/app/services/util/util.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  users : User[];
  uid : string;

  constructor(private userService: UserService , private router: Router, private chatsService : ChatsService, private util : UtilService) {
   this.util.doLoading('Please Wait...');
   this.userService.getAllUsers().snapshotChanges().pipe(
      map(changes => changes.map(c => ({
        key : c.payload.key, ...c.payload.val()
      }))
      )).subscribe(users => { this.users = users; console.log(users)})
      this.uid = this.userService.getUID();
  }

  openChat(key: string) {
   this.chatsService.chatter =  {
     uid : this.uid,
     interlocutorUID : key
   }
    this.router.navigateByUrl('/chat-view')
  }

  ngOnInit() {
    
  }

}
