import { Component, Input, OnInit } from "@angular/core";
import { Article } from "src/app/interfaces/interfaces";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { ActionSheetController } from "@ionic/angular";
import { SocialSharing } from "@ionic-native/social-sharing/ngx";
import { DataLocalService } from "src/app/servvices/data-local.service";

@Component({
  selector: "app-noticia",
  templateUrl: "./noticia.component.html",
  styleUrls: ["./noticia.component.scss"],
})
export class NoticiaComponent implements OnInit {
  @Input() noticia: Article;
  @Input() i: Number;

  constructor(
    private iab: InAppBrowser,
    private actionsheet: ActionSheetController,
    private socialSharing: SocialSharing,
    private dataLocal: DataLocalService
  ) {}

  ngOnInit() {}

  showNew() {
    const browser = this.iab.create(this.noticia.url, "_system");
  }
  async showMenu() {
    const actionSheet = await this.actionsheet.create({
      buttons: [
        {
          text: "Compartir",
          icon: "share",
          cssClass: "action-dark",
          handler: () => {
            console.log("Share clicked");
            this.socialSharing.share(
              this.noticia.title,
              this.noticia.source.name,
              "",
              this.noticia.url
            );
          },
        },
        this.addRemoveFavorite(),
        {
          text: "Cancelar",
          icon: "close",
          role: "cancel",
          cssClass: "action-dark",
          handler: () => {
            console.log("Cancel clicked");
          },
        },
      ],
    });
    await actionSheet.present();
  }
  addRemoveFavorite() {
    let favoriteBtn: any;
    if (!this.noticia.favorite) {
      favoriteBtn = {
        text: "Agregar a Favoritos",
        cssClass: "action-dark",
        icon: "star",
        handler: () => {
          console.log("Favorito clicked");
          this.noticia.favorite = true;
          this.dataLocal.guardarNoticia(this.noticia);
        },
      };
    } else {
      favoriteBtn = {
        text: "Eliminar de Favoritos",
        cssClass: "action-dark",
        icon: "trash",
        handler: () => {
          console.log("Favorito clicked");
          this.noticia.favorite = false;
          this.dataLocal.elminarNoticia(this.noticia);
        },
      };
    }
    return favoriteBtn;
  }
}
