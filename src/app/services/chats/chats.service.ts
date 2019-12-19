import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { UserService } from '../user/user.service';
import { Chat } from 'src/app/models/chat';
import { Chatter } from 'src/app/models/chatter';

@Injectable()
export class ChatsService {


  public chatter : Chatter; 
 

  constructor(private db : AngularFireDatabase, private userService: UserService) { 
    this.chatter = new Chatter;
   
  }

 // get list of chats of a logged In user. that a user has aleardy
  getChats(): AngularFireList<any> {
   let uid : string = this.userService.getUID();
   console.log('getChats uid', uid);
   return  this.db.list(`/users/${uid}/chats`);
  }

  //add chat references to both users in the db 
  addChats(uid: string, interlocutorUID : string) : void  {
    //firest user
    
    let endPoint : AngularFireObject<boolean> = this.db.object(`/users/${uid}/chats/${interlocutorUID}`);
    endPoint.set(true);

    let endPoint2 :AngularFireObject<boolean> = this.db.object(`/users/${interlocutorUID}/chats/${uid}`);
    endPoint2.set(true);
  }


  getChatRef(uid : string, interlocutorUID: string) : Promise<any> {
    let firstRef =  this.db.object(`chats/${uid},${interlocutorUID}`); 
    let promise = new Promise((resolve, reject) => {
      firstRef.snapshotChanges().subscribe(snpashot => {
        let a = snpashot.payload.exists();
        if(a) {
          resolve(`chats/${uid},${interlocutorUID}`);
        } else {
          let secondRef = this.db.object(`chats/${interlocutorUID},${uid}`);
          secondRef.snapshotChanges().subscribe(snpashot => {
            let b = snpashot.payload.exists(); 
            if(!b) {
              this.addChats(uid, interlocutorUID);
            }
          });
          resolve(`/chats/${interlocutorUID},${uid}`);
          }
        });

      });  
        // return a Promise which reolves to the firebase database URL of chats beteween the 2 users 
          return promise;
      }
    
}
