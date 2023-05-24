import { Injectable } from '@angular/core';
import { AuthServiceService } from '../AuthService/auth-service.service';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class TimeServiceService {

  constructor(private authService: AuthServiceService) { }

  getApiKey(){
    return this.authService.getAuthorizationToken();
  }

  async getTime(league: string) {
    const apiKey : string | any = this.getApiKey();
    //console.log("id liga ", league);
    let times = await this.getTimes(league, apiKey);
    //console.log("times ", times);
    const listTimes : any[] = [];
    for(let i = 0; i < times.api.results; i++) {
      const time = times.api.teams[i];
      listTimes.push(time);
    }

    return listTimes;
  }

  async getTimes(leagueId : string, apiKey: string) {
    const options = {
      method: 'GET',
      url: "https://api-football-v1.p.rapidapi.com/v2/teams/league/"+leagueId,
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getResults(league :string, season:string, time:string){
    const apiKey : string | any = this.getApiKey();
    const results = await this.getTimeStatics(league, season, parseInt(time), apiKey);
    const dataResult = results.response.fixtures;
    //console.log("getResults", results.response.fixtures);
    return dataResult;
  }

  async getStatistics(league :string, season:string, time:string) {
    const apiKey: string | any = this.getApiKey();
    const statisticsGoalsMinutes = await this.getTimeStatistics(league, season, parseInt(time), apiKey);
   // console.log(statisticsGoalsMinutes);

    const minutes: any[] = [];
    const goalsSetData: any[] = [];
    for(let minute in statisticsGoalsMinutes) {
      minutes.push(minute);
      //console.log(minute);
      goalsSetData.push(statisticsGoalsMinutes[minute]?.total || 0);
      //console.log(statisticsGoalsMinutes[minute]?.total || 0);
    }

    const data = {
      labels: minutes,
      datasets: [{
        label: 'Gols marcados:',
        data: goalsSetData,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        pointBorderColor: "#444",
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBackgroundColor: "#444",
        tension: 0.5
      }]
    };

    return data;
  }


  async getTimeStatistics(league :string, season:string, time:number, apiKey :string) {
    const options = {
      method: 'GET',
      url: 'https://api-football-v1.p.rapidapi.com/v3/teams/statistics',
      params: {
        league: league,
        season: season,
        team: time
      },
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      return response.data.response.goals.for.minute;
    } catch (error) {
      console.error(error);
    }
  }

  async getFormation(league :string, season:string, time:string) {
    const apiKey: string = this.getApiKey();
    const statisticsGoalsMinutes = await this.getTimeStatics(league, season, parseInt(time), apiKey);

    console.log("getFormation", statisticsGoalsMinutes);

    let played = 0;
    let mostPlayedFormation = [];
    const staticsFormation = statisticsGoalsMinutes.response.lineups;
    for(let formation in staticsFormation) {
      const playedIstatics = staticsFormation[formation].played;

      const form = staticsFormation[formation].formation;

      if (playedIstatics > played) {
        played = playedIstatics;
        mostPlayedFormation = [];
        mostPlayedFormation.push(playedIstatics);
        mostPlayedFormation.push(form);
      }
    }

    console.log("mais jogado", mostPlayedFormation);
    return mostPlayedFormation;
  }


  async getTimeStatics(league :string, season:string, time:number, apiKey :string) {
    const options = {
      method: 'GET',
      url: 'https://api-football-v1.p.rapidapi.com/v3/teams/statistics',
      params: {
        league: league,
        season: season,
        team: time
      },
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

 async getPlayer(season:string, time:string) {
  const apiKey: string = this.getApiKey();

  const playerInformations = await this.getPlayerInformations(season, parseInt(time), apiKey);

  const playerInformation = [];

  for(let player in playerInformations) {
    playerInformation.push(playerInformations[player].player);
  }

  return playerInformation;
 }

 async getPlayerInformations(season:string, time:number, apiKey :string) {
  const options = {
    method: 'GET',
    url: 'https://api-football-v1.p.rapidapi.com/v3/players',
    params: {
      team: time,
      season: season
    },
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data.response;
  } catch (error) {
    console.error(error);
  }
 }

}
