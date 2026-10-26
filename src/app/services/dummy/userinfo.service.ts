import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserinfoService {

  constructor(readonly http:HttpClient) {}
  getUserInfo(){
    return this.http.get('assets/dummy/data/userinfo.json');
  }
  getLastActivity(){
    return this.http.get('assets/dummy/data/lastactivity.json');
  }
}
