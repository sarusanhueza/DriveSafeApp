import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ConfiguracionComponent } from './modules/inicio/componentes/configuracion/configuracion.component';
import { FormCombustiblePage } from './modules/inicio/page/form-combustible/form-combustible.page';
import { FormGastosPage } from './modules/inicio/page/form-gastos/form-gastos.page';
import { FormRecordatorioPage } from './modules/inicio/page/form-recordatorio/form-recordatorio.page';
import { FormViajePage } from './modules/inicio/page/form-viaje/form-viaje.page';
import { ReconocimientoComponent } from './modules/inicio-admin/componentes/reconocimiento/reconocimiento.component';
import { MenuUsuariosComponent } from './modules/inicio-admin/componentes/menu-usuarios/menu-usuarios.component';
import { EditarAutoComponent } from './modules/inicio/componentes/editar-auto/editar-auto.component';



//creamos las rutas de inicio y auth.
const routes: Routes = [
 
  
//para usar la etiqueta routing deben ir vacias las rutas. //rutas padres
  {
     path: '',loadChildren: () => import('./modules/inicio/inicio.module').then( m => m.InicioModule)
   },
  {
    path: '',loadChildren: () => import('./modules/auth/auth.module').then( m => m.AuthModule)
  },
  {
    path: '',loadChildren: () => import('./modules/inicio-admin/inicio-admin.module').then( m => m.InicioAdminModule)
  },
  {
    path: 'editarAuto', component: EditarAutoComponent
  },
  {
    path: 'configuracion', component: ConfiguracionComponent
  },
  {
    path: 'configuracion/:uid', component: ConfiguracionComponent
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
   path: 'form-gastos/:uid', component: FormGastosPage
  },
  {
    path: 'form-recordatorio', component: FormRecordatorioPage
  },
  {
    path: 'form-recordatorio/:uid', component: FormRecordatorioPage
   },
  {
  path: 'form-viaje', component: FormViajePage
  },
  {
    path: 'form-viaje/:uid', component: FormViajePage
   },
   {
    path: 'reconocimiento', component: ReconocimientoComponent
   },
   {
    path: 'menu-usuarios', component: MenuUsuariosComponent
   },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
