import { Component, OnInit } from '@angular/core';

import { NavController, ToastController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  constructor(public navCtrl: NavController, public toastCtrl: ToastController) {
    // nothing
  }

  metrics: Array<any> = [];
  velocity: number = 0;
  weight: number = 0;
  calories: number = 0;
  start: boolean =  false;
  stop: boolean =  false;
  interval: any;

  ngOnInit () {
    this.metrics.push(
      { "id":"time", "name": "Tempo", "value": { "h":0, "m": 0, "s": 0 } },
      { "id":"calories", "name": "Calorias gastas", "value": 0 },
      { "id":"distance", "name": "Distânicia percorrida", "value": 0 },
      { "id":"weight", "name": "Peso médio gasto", "value": 0 },
    );
  }

  startRun () {

    if(this.velocity == 0) {

      let toast = this.toastCtrl.create({
        message: 'Informe a Velocidade!',
        duration: 3000
      });
      toast.present();

    } else if(this.weight == 0) {

      let toast = this.toastCtrl.create({
        message: 'Informe o seu peso!',
        duration: 3000
      });
      toast.present();

    } else {

      this.start = true;
      this.stop = false;
      this.calories = this.velocity * this.weight * 0.0175;
      this.interval = setInterval(() => this.cronLoop(), 1000);      

    }

  }

  stopRun () {
    this.start = false;
    this.stop = true;
    clearInterval(this.interval);
  }

  cronLoop () {

    let time = this.metrics[0].value.s;
    time = time + (this.metrics[0].value.m * 60);
    time = time + (this.metrics[0].value.h * 3600);
    
    if (this.metrics[0].value.s == 60) { 
      this.metrics[0].value.m ++;
      this.metrics[0].value.s = 0;
      this.calories = this.calories + (this.velocity * this.weight * 0.0175);
      this.metrics[1].value = this.calories.toFixed(2);
      this.metrics[3].value = (this.calories/7000).toFixed(2);
    }

    if (this.metrics[0].value.m == 60) {
      this.metrics[0].value.h++; 
      this.metrics[0].s = 0; 
      this.metrics[0].value.m = 0; 
    }

    this.metrics[0].value.s++;

    let distance = ((this.velocity/3.6) * time)/1000;
    distance = parseFloat(distance.toFixed(2));
    this.metrics[2].value = distance;

    

  }

}
