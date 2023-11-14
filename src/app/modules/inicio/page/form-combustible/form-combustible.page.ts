import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-combustible',
  templateUrl: './form-combustible.page.html',
  styleUrls: ['./form-combustible.page.scss'],
})

export class FormCombustiblePage implements OnInit {
  FormCombustible = new FormGroup ({
    titulo: new FormControl (' ', Validators.required),
    fecha: new FormControl (' ', Validators.required),
    litros: new FormControl (' ', Validators.required),
    tipo: new FormControl (' ', Validators.required),
    gasto: new FormControl (0, Validators.required)

  })

  constructor() { }

  ngOnInit() {
  }

}
