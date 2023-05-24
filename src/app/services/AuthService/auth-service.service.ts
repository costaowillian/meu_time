import { Injectable } from '@angular/core';
import axios  from 'axios';
import  *  as CryptoJS from  'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  criptKey:string = "tradetech"
  constructor() { }

  private encrypt(txt: string): string {
    return CryptoJS.AES.encrypt(txt, this.criptKey).toString();
  }

  private decrypt(txtToDecrypt: string) {
    return CryptoJS.AES.decrypt(txtToDecrypt, this.criptKey).toString(CryptoJS.enc.Utf8);
  }

  async authUser (user: string) {
    const acessKey : string = user;
    const isKeyValid = await this.requestLogin(acessKey);
    if (isKeyValid) {
      window.localStorage.setItem('token', this.encrypt(acessKey));
      return true;
    }

    return false;
  }

  async requestLogin(acessKey : string) {
    const options = {
      method: 'GET',
      url: 'https://api-football-v1.p.rapidapi.com/v3/timezone',
      headers: {
        'X-RapidAPI-Key': acessKey,
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }


  }

  getAuthorizationToken() {
    const token = this.decrypt(window.localStorage.getItem('token') || "");
    return token;
  }

  isUserLoggedIn () {
    const token = this.getAuthorizationToken();
    if(!token) {
      return false;
    }

    return true;
  }
}


