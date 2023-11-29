import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ConfiguracionComponent } from './modules/inicio/componentes/configuracion/configuracion.component';



//creamos las rutas de inicio y auth.
const routes: Routes = [
 
  
//para usar la etiqueta routing deben ir vacias las rutas. 
  {
     path: '',loadChildren: () => import('./modules/inicio/inicio.module').then( m => m.InicioModule)
   },
  {
    path: '',loadChildren: () => import('./modules/auth/auth.module').then( m => m.AuthModule)
  },
  {
    path: 'configuracion', component: ConfiguracionComponent
   },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
