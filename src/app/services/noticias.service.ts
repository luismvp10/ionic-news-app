import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {RespuestaTopHeadlines} from '../interfaces/interface';

const apiKey = environment.API_KEY;
const urlAPI = environment.URI;

const headers = new HttpHeaders({
  'X-Api-key': apiKey
});
@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  headlinePage = 0;
  categoriaActual = '';
  categoriaPage = 0;

  constructor(private http: HttpClient) { }

  private ejecutarQuery<T>(query: string) {
    query = urlAPI + query;
    return this.http.get<T>(query, { headers });
  }


  getTopHeadlines() {
    this.headlinePage ++;
    // return this.http.get<RespuestaTopHeadlines>('http://newsapi.org/v2/top-headlines?country=us&apiKey=' );
    return this.ejecutarQuery<RespuestaTopHeadlines>('/top-headlines?country=us&page=' + this.headlinePage);
  }

  getTopHeadlinesCategoria(categoria: string) {

    if ( this.categoriaActual === categoria){
      this.categoriaPage ++;
    } else {
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
    }
    return  this.ejecutarQuery<RespuestaTopHeadlines>('top-headlines?country=us&category=' + categoria + '&page=' + this.categoriaPage);
    // return this.http.get('http://newsapi.org/v2/top-headlines?country=de&category=business&apiKey=');
  }
}
