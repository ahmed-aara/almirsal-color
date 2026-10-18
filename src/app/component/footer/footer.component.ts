import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';

declare const getDate: any

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

   //Array
   pagesArr: any = [
    { name: 'Home', link: '/' },
    { name: 'About', link: '/about' },
    { name: 'Contact', link: '/contact' },
    { name: 'Service', link: '/service' },
  ]

  contactArr: any = [
    {
      type: "phone",
      value: "01033545417 - 01124722618"
    },
    {
      type: "time",
      value: "Daily 10:00 AM — 7:00 PM"
    },
    {
      type: "location",
      value: "اداره المبيعات: مدينه العبور محافظة القليوبيه"
    },
    {
      type: "email",
      value: "info@almersalcolour.com"
    }
  ]

  social_links: any = [
    "https://m.facebook.com/abas.gamel55/?tsid=0.12536785397165828&source=result",
    "https://www.instagram.com",
    "http://twitter.com/",
    `https://wa.me/+2${this.service.phoneNumber}`
  ]

  //Variable
  year: any

  constructor(private service: ServiceService) {
  }

  ngOnInit(): void {
    this.year = getDate('yyyy')
  }

  sendReport() {
    let message = `أريد التبليغ عن شكوى`
    let Link = `https://api.whatsapp.com/send/?phone=+2${this.service.phoneNumber}&text=${message}&type=phone_number&app_absent=0&type_of_request=ReportComplaint`
    window.open(Link, '_blank');
  }

}
