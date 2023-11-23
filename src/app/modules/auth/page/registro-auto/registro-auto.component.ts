import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { Router } from '@angular/router';
import { Vehiculo } from 'src/app/models/vehiculo';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-registro-auto',
  templateUrl: './registro-auto.component.html',
  styleUrls: ['./registro-auto.component.scss'],
})
export class RegistroAutoComponent {

  constructor( 
    public servicioAuth: AuthService,
    public servicioFirestore: FirestoreService,
    public router: Router
  ) { }
  
  
  ngOnInit() {}

  }
