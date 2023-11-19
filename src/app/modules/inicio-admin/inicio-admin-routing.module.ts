import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ReconocimientoComponent } from "./componentes/reconocimiento/reconocimiento.component";

const routes: Routes =[
    //rutas hijas
    {
        path:'reconocimiento-admin', component:ReconocimientoComponent
    }
]
@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class InicioAdminModule{}