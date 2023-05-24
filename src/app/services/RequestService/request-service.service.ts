import { AuthServiceService } from './../AuthService/auth-service.service';
import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class RequestServiceService{

  constructor(private authService: AuthServiceService) { }

  getApiKey(){
    return this.authService.getAuthorizationToken();
  }

  async getLeague(country: string, seasonId: string) {
    const apiKey : string | any = this.getApiKey();
    const leagues = await this.getLeagues(country, apiKey, seasonId);
    return leagues;
  }

  async getLeagues(country : string, apiKey: string, seasonId: string) {
    const options = {
      method: 'GET',
      url: 'https://api-football-v1.p.rapidapi.com/v2/leagues/country/'+country+'/'+seasonId,
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      return response.data.api.leagues;
    } catch (error) {
      console.error(error);
    }
  }

  async getSeason() {
    const apiKey : string | any = this.getApiKey();
    const seasons = await this.getSeasons(apiKey);

    const listSeasons = [];


    for (let season in seasons) {
      listSeasons.push(seasons[season]);
      console.log(seasons[season]);
    }
    console.log("season", listSeasons)
    return listSeasons;
  }

  async getSeasons(apiKey : string) {
    const options = {
      method: 'GET',
      url: 'https://api-football-v1.p.rapidapi.com/v3/leagues/seasons',
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      return response.data.response;
    } catch (error) {
      console.error(error);
    }
  }

  async getCountry() {
    const apiKey : string | any = this.getApiKey();

    let countries = await this.getCountries(apiKey);

    const listCountries : string[] = [];
    for(let i = 0; i < Object.keys(countries).length; i++) {
      const country = countries[i].country;
      listCountries.push(country);
    }

    return listCountries;
  }

  async getCountries(apiKey : string){
    const options = {
      method: 'GET',
      url: 'https://api-football-v1.p.rapidapi.com/v2/countries',
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      //console.log(response.data);
      return response.data.api.countries;
    } catch (error) {
      console.error(error);
    }
  }

}
