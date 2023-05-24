import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js/auto';
import { TimeServiceService } from 'src/app/services/TimeService/time-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  public chart: any;
  league: string = "";
  time: string= "";
  season: string= "";
  formations: any = [];
  players: any = [];
  dataTable: any = {};

  constructor(private timeService: TimeServiceService,
    public route: ActivatedRoute,
    ) {

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.league = params['league'].toString();
      this.time = params['time'].toString();
      this.season = params['season'].toString();
    });

    this.createChart();
    this.getFormation();
    this.getPlayers();
    this.getDataTable();
  }

  async createChart() {
    const data = await this.getData();
    const max = Math.max(...data.datasets[0].data) + 3
    this.chart = new Chart("MyChart", {
      type: 'line',
      data: data,
      options: {
        aspectRatio:2.5,
        scales: {
          y: {
              min: 0,
              max,
              ticks: {
                  stepSize: 1
              }
          }
      }
      }

    });
  }

  async getData() {
    const data = await this.timeService.getStatistics(this.league, this.season, this.time);
    return data;
  }

  async getFormation() {
    this.formations = await this.timeService.getFormation(this.league, this.season, this.time);
  }

  async getPlayers() {
    this.players = await this.timeService.getPlayer(this.season, this.time);
  }

  async getDataTable(){
    this.dataTable = await this.timeService.getResults(this.league, this.season, this.time);
  }

}
