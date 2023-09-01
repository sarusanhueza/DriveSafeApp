import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {
  public alertButtons = ['OK'];
  public alertInputs = [
    {
      placeholder: 'Name',
    },
    {
      type: 'number',
      placeholder: 'Age',
      min: 1,
      max: 100,
    },
  ];


  constructor() {

   }

  ngOnInit() {}

}




