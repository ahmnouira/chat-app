import { Component, OnInit } from '@angular/core';
import { ChatsService } from 'src/app/services/chats/chats.service';
import { map } from "rxjs/operators";
import { UtilService } from 'src/app/services/util/util.service';
import { User } from 'src/app/models/user';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {

  uids : any;
  users: User[] = new Array<User>();
  chats : any;
  constructor(private chatsService: ChatsService, private utilService: UtilService,  private db : AngularFireDatabase) { 
    this.utilService.doLoading('Please Wait Loading Chats...');
    this.chatsService.getChats().snapshotChanges().pipe(
      map(changes => changes.map(c => ({
        key : c.payload.key, ...c.payload.val()
      }))
      )).subscribe(uids => {
       uids.map(uid => {
          console.log('user', uid);
          this.db.object(`/users/${uid.key}`).valueChanges().subscribe((user: User) => { user.key = uid.key;  this.users.push(user)});
          })
          console.log('1', this.users);
        })
            
      // key : chat.payload.key, ...chat.payload.val()
      // user : this.db.object(`/users/${chat.payload.key}`)
  }
  
  openChat(key: string) {
    alert(key);
  }

  ngOnInit() {
 
  }


}
