import { Component, OnInit, ViewChild } from "@angular/core";
import { Article } from "src/app/interfaces/interfaces";
import { NoticiasService } from "src/app/servvices/noticias.service";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})
export class Tab2Page implements OnInit {
  categoriaActual = "";
  noticias: Article[] = [];
  categorias: string[] = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ];
  constructor(private noticiasServices: NoticiasService) {}

  ngOnInit() {
    this.categoriaActual = this.categorias[0];
    this.cargarNoticias(this.categorias[0]);
  }

  cambiarCategoria(event) {
    this.noticias = [];
    this.categoriaActual = event.detail.value;
    this.cargarNoticias(event.detail.value);
  }

  loadData(event) {
    this.cargarNoticias(this.categoriaActual, event);
  }

  cargarNoticias(categoria, event?) {
    this.noticiasServices
      .getTopHeadLinesCategory(categoria)
      .subscribe((result) => {
        this.noticias.push(...result.articles);
        if (event) {
          event.target.complete();
        }
      });
  }
}
