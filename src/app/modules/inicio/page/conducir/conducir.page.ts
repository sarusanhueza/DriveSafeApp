import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-conducir',
  templateUrl: './conducir.page.html',
  styleUrls: ['./conducir.page.scss'],
})
export class ConducirPage implements OnInit {

  constructor(
   
  ) { }

  ngOnInit() {
  }
  public timeBegan: any = null // inicio tiempo
  public timeStopped:any = null // paro del tiempo
  public stoppedDuration:any = 0 // tiempo que estuvo el tiempo detenido
  public started: any = null // momento que se reinicio
  public running = false // si el cronometro esta en ejecucion
  public blankTime = "00:00.000"
  public time = "00:00.000"
  

 

//inicia el cronometro si no habia estado en ejecucion
  inicio() {
    if(this.running) return;
    if (this.timeBegan === null) {
        this.resetear();
        this.timeBegan = new Date();
    }
    //se ajusta al momento que fue detenido
    if (this.timeStopped !== null) {
      let newStoppedDuration:any = (+new Date() - this.timeStopped)
      this.stoppedDuration = this.stoppedDuration + newStoppedDuration;
    }
    //se inicia intervalo para actualizar cada 10seg el tiempo transcurrido
    this.started = setInterval(this.reloj.bind(this), 10);
      this.running = true;
    }
    
    //detiene el cronometro si esta en ejecucion
    parar() {
      this.running = false;
      //registra momento de detencion y limpia el intervalo
      this.timeStopped = new Date();
      clearInterval(this.started);
   }

   // detiene el cronometro, limpia el intervalo y establece variables desde 0
    resetear() {
      this.running = false;
      clearInterval(this.started);
      this.stoppedDuration = 0;
      this.timeBegan = null;
      this.timeStopped = null;
      this.time = this.blankTime;
    }

    // agrega ceros a la izquierda del numero para cumplir con la cantdad de digitios
    zeroPrefix(num, digit) {
      let zero = '';
      for(let i = 0; i < digit; i++) {
        zero += '0';
      }
      return (zero + num).slice(-digit);
    }

    //calcula y actualiza el tiempo transcurrido
    reloj(){
      let currentTime:any = new Date()
      let timeElapsed:any = new Date(currentTime - this.timeBegan - this.stoppedDuration)
      let hour = timeElapsed.getUTCHours()
      let min = timeElapsed.getUTCMinutes()
      let sec = timeElapsed.getUTCSeconds()
      let ms = timeElapsed.getUTCMilliseconds();
    this.time =
      this.zeroPrefix(hour, 2) + ":" +
      this.zeroPrefix(min, 2) + ":" +
      this.zeroPrefix(sec, 2) + "." +
      this.zeroPrefix(ms, 3);
    };
}


