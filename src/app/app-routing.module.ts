import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';



//creamos las rutas de inicio y auth.
const routes: Routes = [
 
  

  {
     path: '',loadChildren: () => import('./modules/inicio/inicio.module').then( m => m.InicioModule)
   },
  {
    path: '',loadChildren: () => import('./modules/auth/auth.module').then( m => m.AuthModule)
  },

  //{
    //path: '',
    //redirectTo: 'inicio',
    //pathMatch: 'full'
  //}

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
