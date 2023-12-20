import { Component, Input, OnInit } from '@angular/core';
import { Promocion } from 'src/app/interfaces/promocion.interface';

@Component({
  selector: 'app-promocion-box',
  templateUrl: './promocion-box.component.html',
  styleUrls: ['./promocion-box.component.scss']
})
export class PromocionBoxComponent implements OnInit {
  @Input() promocion!: Promocion;
  linkImage: string = `assets/imgs/descuento/descuento-${1}.png`;
  timer: any;
  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;

  ngOnInit(): void {
    if (!this.promocion.fechaInicio || !this.promocion.fechaFin) {
      console.error('Please provide both start and end dates.');
      return;
    }

    this.timer = setInterval(() => {
      this.timeBetweenDates();
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  timeBetweenDates(): void {
    const now = new Date();
    const fechaFin = new Date(this.promocion.fechaFin)
    const difference = fechaFin.getTime() - now.getTime();
    if (difference <= 0) {
      clearInterval(this.timer);
    } else {
      const seconds = Math.floor(difference / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      this.hours = hours % 24;
      this.minutes = minutes % 60;
      this.seconds = seconds % 60;
      this.days = days;

    }
  }

  unCaracter(value: number) {
    if (value.toString().length <= 1) {
      return true
    }else {
      return false
    }
  }
}