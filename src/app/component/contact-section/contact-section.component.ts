import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { IMG } from 'src/app/page/landing-page/landing-assets';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-contact-section',
  templateUrl: './contact-section.component.html',
  styleUrls: ['./contact-section.component.scss']
})
export class ContactSectionComponent {

  img = IMG

  //Array
  contactInfoArr = [
    { icon: IMG + 'icons/email.svg', title: 'البريد الإلكتروني', lines: ['info@almersalcolour.com'], href: 'mailto:info@almersalcolour.com' },
    { icon: IMG + 'icons/phone.svg', title: 'الهاتف', lines: ['01033545417', '01124722618'], href: 'tel:+201033545417' },
    { icon: IMG + 'icons/location.svg', title: 'الموقع', lines: ['اداره المبيعات: مدينه العبور محافظة القليوبيه'], href: '' },
  ]

  // Order matches the design (right to left). Icons without a known account URL are not rendered.
  socialArr = [
    { icon: IMG + 'icons/twitter.svg', name: 'X (Twitter)', url: '' },
    { icon: IMG + 'icons/tiktok.svg', name: 'TikTok', url: '' },
    { icon: IMG + 'icons/linkedin.svg', name: 'LinkedIn', url: '' },
    { icon: IMG + 'icons/snapchat.svg', name: 'Snapchat', url: '' },
    { icon: IMG + 'icons/instagram.svg', name: 'Instagram', url: '' },
    { icon: IMG + 'icons/whatsapp.svg', name: 'WhatsApp', url: `https://wa.me/+2${this.service.phoneNumber}` },
  ]

  //variable
  mapUrl: SafeResourceUrl
  error_msg = ''

  //Data
  messageData: any = {
    firstName: null,
    lastName: null,
    phone: null,
    email: null,
    message: null,
  }

  constructor(private service: ServiceService, private sanitizer: DomSanitizer) {
    const query = encodeURIComponent('مصنع المرسال كلر للدهانات والبويات الحديثة، سبين، الغربية');
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://maps.google.com/maps?q=${query}&z=16&output=embed`);
  }

  sendMessage() {
    this.error_msg = '';
    const { firstName, lastName, phone, email, message } = this.messageData;

    if (!firstName || !lastName || !phone || !email || !message) {
      this.error_msg = 'يجب استكمال البيانات';
      return;
    }

    let text = `الاسم: ${firstName} ${lastName}\nالهاتف: +20${phone}\nالبريد الإلكتروني: ${email}\nالرسالة: ${message}\nأريد التواصل معك`
    let Link = `https://api.whatsapp.com/send/?phone=+2${this.service.phoneNumber}&text=${encodeURIComponent(text)}&type=phone_number&app_absent=0&type_of_request=ContactUs`
    window.open(Link, '_blank');
  }

}
