import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { RespuestaTopHeadlines } from "../interfaces/interfaces";

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;
const headers = new HttpHeaders({
  "X-Api-Key": apiKey,
});

@Injectable({
  providedIn: "root",
})
export class NoticiasService {
  headCount = 0;
  categoriaPage = 0;
  categoriaActual = "";
  constructor(private http: HttpClient) {}

  queryRequest<t>(query: string) {
    query = apiUrl + query;
    return this.http.get<t>(query, { headers });
  }

  getTopHeadLines() {
    this.headCount++;
    return this.queryRequest<RespuestaTopHeadlines>(
      `/top-headlines?country=us&page=${this.headCount}`
    );
  }
  getTopHeadLinesCategory(category) {
    if (this.categoriaActual === category) {
      this.categoriaPage++;
    } else {
      this.categoriaPage = 1;
      this.categoriaActual = category;
    }
    return this.queryRequest<RespuestaTopHeadlines>(
      `/top-headlines?country=us&category=${category}&page=${this.categoriaPage}`
    );
  }
}
