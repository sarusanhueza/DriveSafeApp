import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroComponent } from './page/registro/registro.component';
import { LoginComponent } from './page/login/login.component';

//rutas utilizadas
const routes: Routes = [
  {path: "registro", component: RegistroComponent},
  {path: "login", component: LoginComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
