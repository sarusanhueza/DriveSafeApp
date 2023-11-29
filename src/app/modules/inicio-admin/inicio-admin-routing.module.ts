import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioAdminModule } from './inicio-admin.module';
import { ReconocimientoComponent } from './componentes/reconocimiento/reconocimiento.component';
import { MenuUsuariosComponent } from './componentes/menu-usuarios/menu-usuarios.component';


const routes: Routes = [
  //rutas hijas del modulo "inicio-admin"
  {path:'reconocimiento', component:ReconocimientoComponent},
  {path: 'menu-usuarios', component:MenuUsuariosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioAdminRoutingModule { }
