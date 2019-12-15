import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable()

export class UtilService {

  constructor(private alertController: AlertController, private toastController: ToastController) { }


  doToast(title: string, message: string) : void  {
     this.toastController.create({
      header: title,
      message: message,
      position: "top",
      duration: 3000,
      animated: true
    }).then(toast => toast.present().catch(err => console.error(err)));

  }

  doAlert(title :string, message: string, buttonText: string) : void {
    console.log('alert message: ', message);
    this.alertController.create({
      header: title,
      message: message,
      buttons: [buttonText]
    }).then(alert => alert.present()).catch(err => console.log(err));
  }

}
