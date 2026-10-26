import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(readonly http:HttpClient) { }
  getHomeArticles(){
    return this.http.get('assets/dummy/data/homearticle.json');
  }
}
