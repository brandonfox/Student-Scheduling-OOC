import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Card} from '../model/card';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class CardService {

  constructor(private http: HttpClient) { }

  private url = 'http://localhost:8080/';

  public getCards() {
    return this.http.get<Card[]>(this.url + '/cards');
  }

  public editCard(card) {
    return this.http.post(this.url + '/edit-card', card);
  }

  public createCard(card) {
    return this.http.post<Card>(this.url + '/create-card', card);
  }
}
