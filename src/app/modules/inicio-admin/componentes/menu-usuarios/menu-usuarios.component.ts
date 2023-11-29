import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { CrudService } from 'src/app/modules/inicio/services/crud.service';

@Component({
  selector: 'app-menu-usuarios',
  templateUrl: './menu-usuarios.component.html',
  styleUrls: ['./menu-usuarios.component.scss'],
})
export class MenuUsuariosComponent  implements OnInit {

    coleccionUsuarios: Usuario[] = [];
    usuarioSelec!: Usuario;
  constructor(
    public servicioCrud: CrudService,
  ) { }

  ngOnInit(): void {
    this.servicioCrud.obtenerUsuario().subscribe(usuario => {
    this.coleccionUsuarios = usuario;
    })

  
  }

  mostrarBorrarUsuario(uid: string){
    this.servicioCrud.eliminarUsuario(uid)
  }
}
