import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  //variable
  product_id: any
  askProductLink: any
  contactLink: any

  //Array
  productArr: any = []

  //Data
  productData: any = {
    name: null,
    price: null,
    img: null,
    images: null,
    available: null,
    specification: null
  }

  loaded_:any = false

  constructor(private service: ServiceService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    this.product_id = params['id']
    this.detail(params['id'])
    this.getProduct()
    let message = `أريد التواصل معك`
    this.contactLink = `https://api.whatsapp.com/send/?phone=+2${this.service.phoneNumber}&text=${message}&type=phone_number&app_absent=0&type_of_request=ContactUs`
  }

  detail(id: any) {
    this.service.getProductById(id).subscribe(
      response => {
        this.productData = {
          name: response.name,
          price: response.price,
          img: response.img,
          images: response.images,
          available: response.available,
          specification: response.specification,
        }
        let message = `أريد معرفة التفاصيل أكثر عن *(${response.name})*%0a${window.location.href}`
        this.askProductLink = `https://api.whatsapp.com/send/?phone=+2${this.service.phoneNumber}&text=${message}&type=phone_number&app_absent=0&type_of_request=ProductDetail`
        this.loaded_ = true
      },
      err => {
        console.log(err)
      }
    )
  }

  selectImage(item: any) {
    this.productData.img = item
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
