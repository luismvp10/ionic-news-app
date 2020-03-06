import { Injectable } from '@angular/core';
import { Storage} from '@ionic/storage';
import {Article} from '../interfaces/interface';
import {ToastController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  noticias: Article[] = [];
  constructor(private storage: Storage,
              private toastCtrl: ToastController) {
    this.cargarFavoritos();
  }

  guardarNoticia( noticia: Article ) {

    const existe = this.noticias.find( noti => noti.title === noticia.title );

    if ( !existe ) {
      this.noticias.unshift( noticia );
      this.storage.set('favoritos', this.noticias);
      this.presentToast("Noticia Guardada");
    }

  }

  async cargarFavoritos() {
    const favoritos = await this.storage.get('favoritos');
  if ( favoritos ) {
    console.log('async await', favoritos);
    this.noticias = favoritos;
  }

        // .then(favoritos => {
        //   console.log('favoritos', favoritos);
        // });
  }

  borrarNoticia( noticia: Article) {
    this.noticias = this.noticias.filter( noti => noti.title !== noticia.title );
    this.storage.set('favoritos', this.noticias);
    this.presentToast("Noticia Borrada");
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }
}
