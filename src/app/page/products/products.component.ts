import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ServiceService } from 'src/app/services/service.service';
import { PRODUCT_CATEGORIES } from 'src/app/services/product-categories';

type SortKey = 'default' | 'price-asc' | 'price-desc' | 'name'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  //Array
  productArr: any[] = []
  categoryArr: { id: string, label: string, count: number }[] = []

  sortArr: { id: SortKey, label: string }[] = [
    { id: 'default', label: 'الترتيب الافتراضي' },
    { id: 'price-asc', label: 'السعر: من الأقل للأعلى' },
    { id: 'price-desc', label: 'السعر: من الأعلى للأقل' },
    { id: 'name', label: 'الاسم (أ - ي)' },
  ]

  //variable
  search = ''
  category = 'all'
  sort: SortKey = 'default'
  loaded_ = false
  helpLink = ''

  private querySub?: Subscription

  constructor(private service: ServiceService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.helpLink = `https://api.whatsapp.com/send/?phone=+2${this.service.phoneNumber}&text=${encodeURIComponent('محتاج مساعدة في اختيار المنتج المناسب لمشروعي')}&type=phone_number&app_absent=0&type_of_request=ProductHelp`

    // Filters live in the URL so a filtered view can be shared or bookmarked
    this.querySub = this.route.queryParamMap.subscribe(params => {
      this.search = params.get('q') || ''
      this.category = params.get('category') || 'all'
      this.sort = (params.get('sort') as SortKey) || 'default'
    })

    this.service.getProduct().subscribe(
      response => {
        this.productArr = response
        this.categoryArr = PRODUCT_CATEGORIES
          .map(item => ({ ...item, count: response.filter((product: any) => product.category === item.id).length }))
          .filter(item => item.count)
        this.loaded_ = true
      },
      err => {
        console.log(err)
        this.loaded_ = true
      }
    )
  }

  ngOnDestroy(): void {
    this.querySub?.unsubscribe()
  }

  get filteredArr(): any[] {
    const query = this.normalize(this.search)

    const list = this.productArr.filter(product => {
      if (this.category !== 'all' && product.category !== this.category) return false
      if (!query) return true
      const text = [product.name, product.summary, ...(product.features || [])].join(' ')
      return this.normalize(text).includes(query)
    })

    switch (this.sort) {
      case 'price-asc': return [...list].sort((a, b) => Number(a.price) - Number(b.price))
      case 'price-desc': return [...list].sort((a, b) => Number(b.price) - Number(a.price))
      case 'name': return [...list].sort((a, b) => a.name.localeCompare(b.name, 'ar'))
      default: return list
    }
  }

  get categoryLabel(): string {
    return this.categoryArr.find(item => item.id === this.category)?.label || ''
  }

  get hasFilters(): boolean {
    return !!this.search || this.category !== 'all' || this.sort !== 'default'
  }

  setCategory(id: string) {
    this.updateQuery({ category: id === 'all' ? null : id })
  }

  setSort(id: string) {
    this.updateQuery({ sort: id === 'default' ? null : id })
  }

  onSearch(value: string) {
    this.search = value
    this.updateQuery({ q: value.trim() || null })
  }

  clearFilters() {
    this.router.navigate([], { relativeTo: this.route, queryParams: {}, replaceUrl: true })
  }

  trackById(index: number, product: any) {
    return product.id
  }

  private updateQuery(params: { [key: string]: string | null }) {
    this.router.navigate([], { relativeTo: this.route, queryParams: params, queryParamsHandling: 'merge', replaceUrl: true })
  }

  // Arabic-friendly matching: ignore diacritics and letter variants (أ/إ/آ, ة/ه, ى/ي)
  private normalize(text: string): string {
    return (text || '')
      .toLowerCase()
      .replace(/[ً-ْـ]/g, '')
      .replace(/[أإآ]/g, 'ا')
      .replace(/ة/g, 'ه')
      .replace(/ى/g, 'ي')
      .replace(/\s+/g, ' ')
      .trim()
  }

}
