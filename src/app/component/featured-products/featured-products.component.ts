import { Component, Input, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.scss']
})
export class FeaturedProductsComponent implements OnInit {

  @Input() heading = 'حلول متكاملة لكل مرحلة من مراحل التشطيب'
  @Input() headingId = 'products-title'
  // Product left out of the list (the one already on screen)
  @Input() excludeId = ''

  // Product ids from assets/json/product.json, in the order shown in the design (right to left)
  featuredProductIds = ['015', '006', '007', '008']
  productArr: any = []
  loaded_ = false

  constructor(private service: ServiceService) { }

  ngOnInit(): void {
    this.getProduct()
  }

  get visibleProducts(): any[] {
    return this.productArr.filter((item: any) => item.id !== this.excludeId)
  }

  getProduct() {
    this.service.getProduct().subscribe(
      response => {
        this.productArr = this.featuredProductIds
          .map(id => response.find((item: any) => item.id === id))
          .filter(Boolean)
        this.loaded_ = true
      },
      err => {
        console.log(err)
        this.loaded_ = true
      }
    )
  }

}
