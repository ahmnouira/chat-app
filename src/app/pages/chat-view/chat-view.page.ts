import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Chat } from 'src/app/models/chat';
import { ChatsService } from 'src/app/services/chats/chats.service';
import { UtilService } from 'src/app/services/util/util.service';
import { CameraService } from 'src/app/services/camera/camera.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.page.html',
  styleUrls: ['./chat-view.page.scss'],
})
export class ChatViewPage implements OnInit {

  message: string;
  uid : string = ''; 
  interlocutorUID : string  = ''; 
  chats: Array<Chat>; 
  chatsRef : AngularFireList<Chat>;

  uidData: User; 
  interlocutorUIDData : User; 

  constructor(private chatsService: ChatsService, private db : AngularFireDatabase, private utilService : UtilService, private camera: CameraService) { 
    this.utilService.doLoading('Please Wait...');
    // get uids 
    this.uid  = this.chatsService.chatter.uid
    this.interlocutorUID =  this.chatsService.chatter.interlocutorUID;

    // get chat Reference 
    chatsService.getChatRef(this.uid, this.interlocutorUID).then((chatRefPath : string) => {
      console.log('chatRef: uid, interlocutorUID', chatRefPath);
      this.chatsRef = this.db.list(chatRefPath);
      this.db.list(chatRefPath).valueChanges().subscribe((chats :  Chat[]) => { console.log('chats', chats);  this.chats = chats }) ;

    }); 
    this.db.object(`/users/${this.uid}`).valueChanges().subscribe((user : User) => { console.log('loged user', user); this.uidData = user });
    this.db.object(`/users/${this.interlocutorUID}`).valueChanges().subscribe((user : User) => { console.log('interlo', user);  this.interlocutorUIDData = user });
  }

  sendMessage() : void {
    if(this.message) {
      let chat : Chat = {
        from: this.uid,
        message : this.message,
        type: 'message',
        to: this.interlocutorUID,
        picture : null
      };
      this.chatsRef.push(chat);
      this.message ="";
    }
  }; 
  
  sendPicture() : void {

    this.camera.getPicture().then(imageData => {
    let chat: Chat  = {
      from: this.uid,
      message: '',
      type: 'picture',
      picture: 'data:image/jpeg;base64,' + imageData,
      to: this.interlocutorUID,
    };
    this.chatsRef.push(chat);
    }).catch(err => this.utilService.doAlert(`Error`, `This feature only works on Mobiles.`, 'OK'));
  }
  ngOnInit() {
    
  }

}
