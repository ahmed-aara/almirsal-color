import { Component, Input, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';

declare const UIkit: any

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  @Input() navbar_type = ''

  pagesArr: any = [
    { name: 'الصفحة الرئيسية', link: '/' },
    { name: 'معلومات عنا', link: '/about' },
  ]

  productArr:any = []

  constructor(private service: ServiceService) {}

  ngOnInit(): void {
    this.getProduct()
  }

  closeOffcanvas(name: any) {
    UIkit.offcanvas(`#${name}`).hide();
  }

  getProduct() {
    this.service.getProduct().subscribe(
      response => {
        this.productArr = response

        const shuffle = (array: string[]) => {
          return array.map((a) => ({ sort: Math.random(), value: a }))
            .sort((a, b) => a.sort - b.sort)
            .map((a) => a.value);
        };

        this.productArr = shuffle(response).slice(0, 4);

      },
      err => {
        console.log(err)
      }
    )
  }
  

}
