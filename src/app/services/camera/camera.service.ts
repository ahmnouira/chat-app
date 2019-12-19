import { Injectable } from '@angular/core';
import { Camera, CameraOptions} from "@ionic-native/camera/ngx";
import { UserService } from '../user/user.service';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable()

export class CameraService {

  constructor(private userSevice: UserService, private db: AngularFireDatabase, private camera: Camera) {

   }

   getPicture() : Promise<any> {

    let options: CameraOptions = {
     // quality: 100,  // quality  of the image 
      allowEdit: true,  // alow simple editing of the image before selection 
      saveToPhotoAlbum: true,
      destinationType : this.camera.DestinationType.DATA_URL,
      sourceType : this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };
     // get the picture 
     return this.camera.getPicture(options);
   }

   // getPicture() and updatePicture() returns promise ==> async 
   async updatePicture() : Promise<any> {
    // select the user object
    let pictureRef = this.db.object(`/users/${this.userSevice.getUID()}`);
    const imageData = await this.getPicture();
    let base64Image : string = 'data:image/jpeg;base64,' + imageData;
     // save the image data:image on that db 
    pictureRef.update({ picture: base64Image });
  }  
}
