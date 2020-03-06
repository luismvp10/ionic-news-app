import {Component, Input, OnInit} from '@angular/core';
import {Article} from '../../interfaces/interface';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import {ActionSheetController, ToastController} from '@ionic/angular';
import {SocialSharing} from '@ionic-native/social-sharing/ngx';
import {DataLocalService} from '../../services/data-local.service';


@Component({
    selector: 'app-noticia',
    templateUrl: './noticia.component.html',
    styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {
    @Input() noticia: Article;
    @Input() indice: number;
    @Input() enFavoritos;

    constructor(private iab: InAppBrowser,
                private actionSheetCtrl: ActionSheetController,
                private toastCtrl: ToastController,
                private socialSharing: SocialSharing,
                private dataLocalService: DataLocalService) {
    }

    ngOnInit() {
        console.log('Fav', this.enFavoritos);
    }


    abrirNoticia() {
        // console.log(this.noticia.url);
        const browser = this.iab.create(this.noticia.url, '_system');
    }

    async lanzarMenu() {

        let guardarBorrarBtn;

        if (this.enFavoritos) {
            ///Borrar de favoritos
            guardarBorrarBtn = {
                text: 'Borrar',
                icon: 'trash',
                cssClass: 'action-dark',
                handler: () => {
                    console.log('Trash clicked');
                    this.dataLocalService.borrarNoticia(this.noticia);
                }
            };
        } else {
            guardarBorrarBtn = {
                text: 'Favorite',
                icon: 'heart',
                cssClass: 'action-dark',
                handler: () => {
                    console.log('Favorite clicked');
                    this.dataLocalService.guardarNoticia(this.noticia);
                }
            };
        }

        const actionSheet = await this.actionSheetCtrl.create({
            mode: "md",
            buttons: [{
                text: 'Share',
                icon: 'share',
                cssClass: 'action-dark',
                handler: () => {
                    console.log('Share clicked');
                    this.socialSharing.share(
                        this.noticia.title,
                        this.noticia.url,
                        '',
                        this.noticia.url
                    );
                }
            },
                guardarBorrarBtn,
                {
                    text: 'Cancel',
                    cssClass: 'action-dark',
                    icon: 'close',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }]
        });
        await actionSheet.present();
    }



}
