import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GuardGuard } from './guard/guard.guard';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HomePageComponent } from './pages/home/home-page/home-page.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: HomePageComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' } ],
      canActivate: [GuardGuard]
  },

  { path: 'dashboard', component: DashboardComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' } ],
      canActivate: [GuardGuard]
  },

  { path: '', pathMatch: 'full', redirectTo: 'login' },

  { path: 'login', pathMatch: 'full', component: LoginPageComponent },

  { path: 'home', pathMatch: 'full', component: HomePageComponent },

  { path: 'dashboard', pathMatch: 'full', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
