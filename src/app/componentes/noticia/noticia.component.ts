import { Component, Input, OnInit } from "@angular/core";
import { Article } from "src/app/interfaces/interfaces";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { ActionSheetController } from "@ionic/angular";

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
    private actionsheet: ActionSheetController
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
          },
        },
        {
          text: "Favoritos",
          cssClass: "action-dark",
          icon: "star",
          handler: () => {
            console.log("Favorito clicked");
          },
        },
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
}
