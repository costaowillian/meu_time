import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { DashboardComponent } from '../dashboard/dashboard.component';



@NgModule({
  declarations: [
    HomePageComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
