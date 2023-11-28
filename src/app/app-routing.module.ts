import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { FormCombustiblePage } from './modules/inicio/page/form-combustible/form-combustible.page';
import { FormGastosPage } from './modules/inicio/page/form-gastos/form-gastos.page';
import { FormRecordatorioPage } from './modules/inicio/page/form-recordatorio/form-recordatorio.page';
import { FormViajePage } from './modules/inicio/page/form-viaje/form-viaje.page';



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
    path: 'form-combustible', component: FormCombustiblePage 
  },
  { 
    path: 'form-combustible/:uid', component: FormCombustiblePage 
  },
  {
    path: 'form-gastos', component: FormGastosPage
  },
  {
    path: 'form-recordatorio', component: FormRecordatorioPage
  },
  {
  path: 'form-viaje', component: FormViajePage
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
