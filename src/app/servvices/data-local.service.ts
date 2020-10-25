import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { Article } from "../interfaces/interfaces";
import { ToastController } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class DataLocalService {
  noticias: Article[] = [];

  constructor(private storage: Storage, private toast: ToastController) {
    this.cargarNoticia();
  }

  async cargarNoticia() {
    const favoritos = await this.storage.get("favoritos");
    if (favoritos) {
      this.noticias = favoritos;
    }
  }

  guardarNoticia(noticia: Article) {
    const existe = this.noticias.find((el) => el.title === noticia.title);
    if (!existe) {
      this.noticias.unshift(noticia);
      this.storage.set("favoritos", this.noticias);
      this.presentToast("Agregado a Favoritos");
    }
  }

  async elminarNoticia(noticia: Article) {
    this.noticias = this.noticias.filter((el) => el.title !== noticia.title);
    await this.storage.set("favoritos", this.noticias);
    this.presentToast("Eliminado de Favoritos");
  }

  async presentToast(message: string) {
    const toast = await this.toast.create({
      message,
      duration: 2000,
      position: "top",
      animated: true,
    });
    toast.present();
  }
}
