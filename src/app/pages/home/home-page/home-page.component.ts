import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestServiceService } from 'src/app/services/RequestService/request-service.service';
import { TimeServiceService } from 'src/app/services/TimeService/time-service.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit{
  formSelect = this.fb.group({
    country: ["", [
      Validators.required
    ]],
    season: ["", [
      Validators.required
    ]],
    league: ["", [
      Validators.required
    ]],
    time: ["", [
      Validators.required
    ]]
  });

  leagues: any[] = [];
  countries: string[] = [];
  seasons: any[] = [];
  times: any[] = [];

  constructor(
    private requestService : RequestServiceService,
    private timeService : TimeServiceService,
    private fb : FormBuilder,
    public router : Router
  ) {  }

  ngOnInit(): void {
     this.getCountries();
  }

  onSubmitData() {
    const league = this.formSelect.value.league?.toString();
    const time = this.formSelect.value.time?.toString();
    const season = this.formSelect.value.season?.toString();

    if (this.formSelect.valid) {
      this.router.navigate(['dashboard'], {
        queryParams: { league: league, time: time, season: season }
      });
  }
  }

  async getCountries() {
    this.countries = await this.requestService.getCountry();

  }

  async getSeason() {
    this.seasons = await this.requestService.getSeason();

  }

  async getLeague() {
    let country = this.formSelect.value.country?.toString() ?? '';
    const season = this.formSelect.value.season?.toString() ?? ''
    this.leagues = await this.requestService.getLeague(country, season);
  }

  async getTime() {
    const leagueId = this.formSelect.value.league?.toString() ?? '';
    this.times = await this.timeService.getTime(leagueId);
  }
}


