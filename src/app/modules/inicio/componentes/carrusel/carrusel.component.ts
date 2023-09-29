import { Component, OnInit } from '@angular/core';
import { LoginComponent } from 'src/app/modules/auth/page/login/login.component';


@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.scss'],
})
export class CarruselComponent  implements OnInit {
  component = LoginComponent
  

  constructor() { }

  ngOnInit() {}

}

