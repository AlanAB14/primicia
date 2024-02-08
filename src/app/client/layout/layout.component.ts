import { Component } from '@angular/core';
import { phoneNumber } from 'src/environments/environment';

@Component({
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class ClientLayoutComponent {

  openWhatsapp() {
    const number = phoneNumber.number;
    const message = 'Tengo una consulta desde la web www.tarjetaprimicia.com.ar';
    const whatsappUrl = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}
}
