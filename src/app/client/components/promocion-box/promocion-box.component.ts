import { Component, Input, OnInit } from '@angular/core';
import { Promocion } from 'src/app/interfaces/promocion.interface';

@Component({
  selector: 'app-promocion-box',
  templateUrl: './promocion-box.component.html',
  styleUrls: ['./promocion-box.component.scss']
})
export class PromocionBoxComponent implements OnInit {
  @Input() promocion!: Promocion;
  @Input() isSpecial: boolean = false;

  linkImage: string = `assets/imgs/descuento/descuento-${1}.png`;
  timer: any;
  days: number | null = null;
  hours: number | null = null;
  minutes: number | null = null;
  seconds: number | null = null;

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

  existenDias() {
    if (this.days !== null && this.hours !== null && this.minutes !== null && this.seconds !== null) {
      return true
    }else {
      return false
    }
  }

  unCaracter(value: number | null) {
    if (value!.toString().length <= 1) {
      return true
    }else {
      return false
    }
  }

  getImageLink() {
    if (this.isSpecial) {
      return `assets/imgs/girl-comercios.png`
    } else {
      return `assets/imgs/descuento/descuento-${1}.png`
    }
  }
}
