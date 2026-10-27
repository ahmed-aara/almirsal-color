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

  get whatsAppLink() {
    return this.service.whatsAppLink('', 'FloatingButton');
  }

  get callLink() {
    return `tel:+2${this.service.phoneNumber}`;
  }

}
