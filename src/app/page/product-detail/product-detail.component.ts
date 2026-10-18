import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  //variable
  product_id: any
  askProductLink = ''
  callLink = `tel:+2${this.service.phoneNumber}`
  selectedImage = ''
  loaded_ = false
  notFound = false

  //Array
  productArr: any = []
  specificationArr: string[] = []

  //Data
  productData: any = null

  private routeSub?: Subscription

  constructor(private service: ServiceService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // The component is reused when moving between products, so follow the id instead of reading it once
    this.routeSub = this.activatedRoute.paramMap.pipe(
      switchMap(params => {
        this.product_id = params.get('id')
        this.loaded_ = false
        return this.service.getProduct()
      })
    ).subscribe(
      response => this.detail(response),
      err => {
        console.log(err)
        this.notFound = true
        this.loaded_ = true
      }
    )
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe()
  }

  detail(products: any[]) {
    this.productData = products.find(item => item.id === this.product_id) || null
    this.notFound = !this.productData
    this.loaded_ = true
    this.productArr = this.shuffle(products.filter(item => item.id !== this.product_id)).slice(0, 4)

    if (!this.productData) return

    this.selectedImage = this.productData.img
    this.specificationArr = (this.productData.specification || '')
      .split('\n')
      .map((line: string) => line.replace(/^\s*[-–•]\s*/, '').trim())
      .filter(Boolean)

    let message = `أريد معرفة التفاصيل أكثر عن *(${this.productData.name})*\n${window.location.origin}/product/${this.productData.id}`
    this.askProductLink = `https://api.whatsapp.com/send/?phone=+2${this.service.phoneNumber}&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0&type_of_request=ProductDetail`
  }

  selectImage(item: string) {
    this.selectedImage = item
  }

  private shuffle(array: any[]) {
    return array.map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
  }

}
