
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


export const routesAuth: Routes = [
  {
    path: '',
    redirectTo: 'login/false',
    pathMatch: 'full'
  },
  {
    //Lazy load
    path: 'login/:primerRegistro',
    loadComponent: () =>
      import('./login/login.component').then((c) => c.LoginComponent),
  },
  {
    //Lazy load
    path: 'loginlookfeel',
    loadComponent: () =>
      import('./loginlookfeel/loginlookfeel.component').then((c) => c.LoginlookfeelComponent),
  },
  {
    //Lazy load con otro archivo
    path: 'cambiarContrasena/:cadena',
    loadComponent: () =>
      import('./cambiar-password/cambiar-password.component').then((c) => c.CambiarPasswordComponent),
  },
  {
    //Lazy load con otro archivo
    path: 'recuperarPassword',
    loadComponent: () =>
      import('./recuperar-password/recuperar-password.component').then((c) => c.RecuperarPasswordComponent),
  },
  
  {
    //Lazy load con otro archivo
    path: 'registroUsuario',
    loadComponent: () =>
      import('./registro-usuarios/registro-usuarios.component').then((c) => c.RegistroUsuariosComponent),
  },
  {
    //Lazy load con otro archivo
    path: 'validarRegistro/:cadena',
    loadComponent: () =>
    import('./validar-registro/validar-registro.component').then((c) => c.ValidarRegistroComponent),
  }

];