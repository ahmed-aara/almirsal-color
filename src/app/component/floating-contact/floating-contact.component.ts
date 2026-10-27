import { Component } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';

// Floating WhatsApp and call buttons shown on every page, using the sales number from ServiceService.
@Component({
  selector: 'app-floating-contact',
  templateUrl: './floating-contact.component.html',
  styleUrls: ['./floating-contact.component.scss']
})
export class FloatingContactComponent {

  constructor(private service: ServiceService) { }

  // Plain chat link (international number, digits only); api.whatsapp.com/send rejects an empty text
  get whatsAppLink() {
    return `https://wa.me/2${this.service.phoneNumber}`;
  }

  get callLink() {
    return `tel:+2${this.service.phoneNumber}`;
  }

}
