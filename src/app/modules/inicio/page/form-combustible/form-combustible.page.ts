import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-combustible',
  templateUrl: './form-combustible.page.html',
  styleUrls: ['./form-combustible.page.scss'],
})
export class FormCombustiblePage implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
  }

}
