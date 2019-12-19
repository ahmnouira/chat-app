import { Injectable } from '@angular/core';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';

@Injectable()

export class UtilService {

  constructor(private alertController: AlertController, private toastController: ToastController, private loadingController : LoadingController) { }

  doToast(title: string, message: string) : void  {
     this.toastController.create({
      header: title,
      message: message,
      position: "top",
      duration: 3000,
      animated: true
    }).then(toast => toast.present()).catch(err => console.log('Toast Error :', err));
  }

  doLoading(message: string) : void {
    this.loadingController.create({
      message: message,
      animated: true,
      duration: 3000, 
    }).then(loading => loading.present()).catch(err => console.log('Loading Error', err));
  }

  doAlert(title :string, message: string, buttonText: string) : void {
    this.alertController.create({
      header: title,
      message: message,
      buttons: [buttonText]
    }).then(alert => alert.present()).catch(err => console.log('Alert Error', err));
  }
}