import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { Article } from "../interfaces/interfaces";

@Injectable({
  providedIn: "root",
})
export class DataLocalService {
  noticias: Article[] = [];

  constructor(private storage: Storage) {
    this.cargarNoticia();
  }

  guardarNoticia(noticia: Article) {
    const existe = this.noticias.find((el) => el.title === noticia.title);
    if (!existe) {
      this.noticias.unshift(noticia);
      this.storage.set("favoritos", this.noticias);
    }
  }

  async cargarNoticia() {
    const favoritos = await this.storage.get("favoritos");
    if (favoritos) {
      this.noticias = favoritos;
    }
  }
}
