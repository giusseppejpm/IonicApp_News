import { Component, OnInit } from "@angular/core";
import { Article } from "src/app/interfaces/interfaces";
import { NoticiasService } from "src/app/servvices/noticias.service";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page implements OnInit {
  noticias: Article[] = [];
  constructor(private noticiasServices: NoticiasService) {}

  ngOnInit() {
    this.cargarNoticias();
  }

  loadData(event) {
    this.cargarNoticias(event);
  }

  cargarNoticias(event?) {
    this.noticiasServices.getTopHeadLines().subscribe((result) => {
      this.noticias.push(...result.articles);
      if (event) {
        if (result.articles.length === 0) {
          event.target.disabled = true;
        }
        event.target.complete();
      }
    });
  }
}
