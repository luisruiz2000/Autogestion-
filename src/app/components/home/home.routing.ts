import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


export const routesAuth: Routes = [
 /* {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },*/
  {
    //Lazy load
    path: 'home',
    loadComponent: () =>
      import('./home.component').then((c) => c.HomeComponent),
  }
];