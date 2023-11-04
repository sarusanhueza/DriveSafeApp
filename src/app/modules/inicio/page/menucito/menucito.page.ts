import { Component, OnInit } from '@angular/core';
import { Nota } from 'src/app/models/nota';
import { CrudService } from '../../services/crud.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-menucito',
  templateUrl: './menucito.page.html',
  styleUrls: ['./menucito.page.scss'],
})
export class MenucitoPage implements OnInit {

  coleccionNota: Nota[] = []; // creamos colección basada en interfaz Producto

  notaSelec!: Nota; // ! -> recibir valores vacíos

  modalVisibleNota: boolean = false;

  // modalVisible: boolean = false;
  // eliminarVisible: boolean = false;

  // formulario vínculado al archivo html
  nota = new FormGroup({
    nombre: new FormControl('',Validators.required),
    imagen: new FormControl('',Validators.required),
    alt: new FormControl('',Validators.required),
    descripcion: new FormControl('',Validators.required),
    precio: new FormControl(0,Validators.required),
    categoria: new FormControl('',Validators.required)
  })

  constructor(
    public servicioCrud: CrudService // patentamos servicio de forma local
  ){}

  ngOnInit(): void{
    this.servicioCrud.obtenerNota().subscribe(nota => {
      this.coleccionNota = nota;
    })
  }

  async agregarNota(){ // método para validar esos valores del producto agregado
    if(this.nota.valid){
      let nuevaNota: Nota = {
        idNota: '',
        nombre: this.nota.value.nombre!,
        imagen: this.nota.value.imagen!,
        alt: this.nota.value.alt!,
        descripcion: this.nota.value.descripcion!,
        precio: this.nota.value.precio!,
        categoria: this.nota.value.categoria!
      };

      // llamamos al servicioCrud; función crearProducto; seteamos nuevoProducto
      await this.servicioCrud.crearNota(nuevaNota)
      .then(nota => {
        alert("Ha agregado un nuevo producto con éxito :)");
      })
      .catch(error => {
        alert("Hubo un error al cargar nuevo producto :( \n"+error);
      })
    }
  }

  // EDITAR PRODUCTO -> VINCULA AL MODAL DE EDITAR
  mostrarEditar(notaSelec: Nota){
    this.notaSelec = this.notaSelec;

    /* retomamos y enviamos los valores de ese producto 
    seleccionado, el ID no se vuelve a enviar porque 
    no se modifica */
    this.nota.setValue({
      nombre: notaSelec.nombre,
      imagen: notaSelec.imagen,
      alt: notaSelec.alt,
      descripcion: notaSelec.descripcion,
      precio: notaSelec.precio,
      categoria: notaSelec.categoria
    })
  }

  // VINCULA A BOTÓN "GUARDAR CAMBIOS"
  // recibir los valores nuevos que ingresemos en el formulario
  editarProducto(){
    let datos: Nota = {
      idNota: this.notaSelec.idNota,
      // signo de exclamación "!" -> puede recibir valores vacíos al inicializar
      nombre: this.nota.value.nombre!,
      imagen: this.nota.value.imagen!,
      alt: this.nota.value.alt!,
      descripcion: this.nota.value.descripcion!,
      precio: this.nota.value.precio!,
      categoria: this.nota.value.categoria!
    }

    this.servicioCrud.modificarNota(this.notaSelec.idNota, datos)
    .then(nota => {
      alert("El producto fue modificado con éxito :).");
    })
    .catch(error => {
      alert("No se pudo modificar el producto :( \n"+error);
    })
  }

  // ELIMINAR EL PRODUCTO
  mostrarBorrar(notaSelec: Nota){ // botón para el modal
    this.modalVisibleNota = true; // modal
    this.notaSelec = this.notaSelec; // asigna producto elegido
  }

  borrarNota(){ // botón para eliminar definitivamente
    this.servicioCrud.eliminarNota(this.notaSelec.idNota)
    .then(respuesta => {
      alert("El producto se ha eliminado correctamente :)");
    })
    .catch(error => {
      alert("No se ha podido eliminar el producto :( \n"+error);
    })
  }
}
