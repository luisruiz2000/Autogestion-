import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [ {
    path: '',
    loadChildren:() =>import('./components/auth/auth.routing').then((r)=>r.routesAuth)
  },
 
  
  
  
     {
      //Lazy load con otro archivo
      path: 'home/:primerRegistro',
      loadComponent: () =>
      import('./components/home/home.component').then((c) => c.HomeComponent),

    },
    {
      //Lazy load con otro archivo
      path: 'autos',
      loadComponent: () =>
      import('./components/autos-main/autos-main.component').then((c) => c.AutosMainComponent),

    },
    {
      //Lazy load con otro archivo
      path: 'radicarSiniestro/:id',
      loadComponent: () =>
      import('./components/radicar-siniestro/radicar-siniestro.component').then((c) => c.RadicarSiniestroComponent),

    },
    {
      //Lazy load con otro archivo
      path: 'autogestion/talleres',
      loadComponent: () =>
      import('./components/talleres/talleres.component').then((c) => c.TalleresComponent),

    },
    
    {
      //Lazy load con otro archivo
      path: 'autogestion/seguimiento-siniestro',
      loadComponent: () =>
      import('./components/seguimiento-siniestro/seguimiento-siniestro.component').then((c) => c.SeguimientoSiniestroComponent),
  
    },
        
    {
      //Lazy load con otro archivo
      path: 'video-peritacion',
      loadComponent: () =>
      import('./components/video-peritacion/video-peritacion.component').then((c) => c.VideoPeritacionComponent),
  
    }
    ,
        
    {
      //Lazy load con otro archivo
      path: 'preguntas-frecuentes',
      loadComponent: () =>
      import('./components/preguntas-frecuentes/preguntas-frecuentes.component').then((c) => c.PreguntasFrecuentesComponent),
  
    }
    ,
        
    {
      //Lazy load con otro archivo
      path: 'notificaciones',
      loadComponent: () =>
      import('./components/notificaciones-main/notificaciones-main.component').then((c) => c.NotificacionesMainComponent),
  
    }
    ,
        
    {
      //Lazy load con otro archivo
      path: 'confirmacion',
      loadComponent: () =>
      import('./shared/confirmation/confirmation.component').then((c) => c.ConfirmationComponent),
  
    },
    {
      //Lazy load con otro archivo
      path: 'autogestion/seguimiento-reparacion',
      loadComponent: () =>
      import('./components/seguimiento-reparacion/seguimiento-reparacion.component').then((c) => c.SeguimientoReparacionComponent),
  
    },
    {
      //Lazy load con otro archivo
      path: 'autogestion/perfil',
      loadComponent: () =>
      import('./components/perfil-usuario/perfil-usuario.component').then((c) => c.PerfilUsuarioComponent),
  
    },
    {
      path: 'servicios',
      loadComponent: () => 
      import('./components/servicios/servicios.component').then((c) => c.ServiciosComponent)  
      
    },
    {
      //Lazy load con otro archivo
      path: 'radicarSiniestro',
      loadComponent: () =>
      import('./components/radicar-siniestro/radicar-siniestro.component').then((c) => c.RadicarSiniestroComponent),

    },
    {
      path: 'hogares',
      loadComponent: () => 
      import('./components/hogar-main/hogar-main.component').then((c) => c.HogarMainComponent)  
      
    },
    
  ];
