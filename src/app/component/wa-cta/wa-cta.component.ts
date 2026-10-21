import { Component, Input } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';

// WhatsApp call to action: opens a chat with the sales number, pre-filled with message.
// Size can be tuned by the parent with --wa-cta-height, --wa-cta-min-width and --wa-cta-font-size.
@Component({
  selector: 'app-wa-cta',
  templateUrl: './wa-cta.component.html',
  styleUrls: ['./wa-cta.component.scss']
})
export class WaCtaComponent {

  @Input() label = ''
  @Input() message = ''
  // Tags the request in the link (type_of_request)
  @Input() type = ''
  @Input() variant: 'fill' | 'outline' | 'outline-dark' = 'fill'

  constructor(private service: ServiceService) { }

  get href() {
    return this.service.whatsAppLink(this.message, this.type);
  }

}
