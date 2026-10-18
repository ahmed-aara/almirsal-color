import { AfterViewInit, Component, ElementRef, NgZone, OnDestroy, OnInit, QueryList, ViewChildren, isDevMode } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ServiceService } from 'src/app/services/service.service';
import { Review } from 'src/app/component/product-reviews/product-reviews.component';
import { TipStep, tipsFor } from './product-tips';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, AfterViewInit, OnDestroy {

  //variable
  product_id: any
  askProductLink = ''
  askQuestionLink = ''
  callLink = `tel:+2${this.service.phoneNumber}`
  selectedImage = ''
  loaded_ = false
  notFound = false
  activeSection = 'details'

  //Array
  productArr: any = []
  specificationArr: string[] = []
  reviewArr: Review[] = []
  // True when the shown reviews include preview samples (local development only)
  sampleReviews = false
  tipSteps: TipStep[] = []

  sectionArr = [
    { id: 'details', label: 'تفاصيل المنتج' },
    { id: 'specs', label: 'المواصفات' },
    { id: 'reviews', label: 'التقييمات والمراجعات' },
    { id: 'tips', label: 'نصائح وإرشادات' },
  ]

  // Company-wide promises, as stated on the home page
  trustArr = [
    { icon: 'assets/img/new-landing-page/delivery-svgrepo-com 3.svg', title: 'جودة مضمونة', text: 'منتجات بمستوى جودة يواكب متطلبات أعمال التشطيب.' },
    { icon: 'assets/img/new-landing-page/delivery-svgrepo-com 2.svg', title: 'أسعار تنافسية', text: 'قيمة أفضل مقابل ما تدفعه.' },
    { icon: 'assets/img/new-landing-page/icons/truck.svg', title: 'توصيل سريع', text: 'تصلك منتجاتك في الوقت المناسب.' },
  ]

  //Data
  productData: any = null

  @ViewChildren('pageSection') pageSections!: QueryList<ElementRef<HTMLElement>>

  private routeSub?: Subscription
  private sectionsSub?: Subscription
  private sectionObserver?: IntersectionObserver

  constructor(private service: ServiceService, private activatedRoute: ActivatedRoute, private zone: NgZone) { }

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

  ngAfterViewInit(): void {
    // Sections are re-rendered for every product, so observe them whenever they change
    this.sectionsSub = this.pageSections.changes.subscribe(() => this.observeSections())
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe()
    this.sectionsSub?.unsubscribe()
    this.sectionObserver?.disconnect()
  }

  detail(products: any[]) {
    this.productData = products.find(item => item.id === this.product_id) || null
    this.notFound = !this.productData
    this.loaded_ = true
    this.activeSection = 'details'
    this.productArr = this.shuffle(products.filter(item => item.id !== this.product_id)).slice(0, 4)

    if (!this.productData) return

    this.selectedImage = this.productData.img
    // Reviews flagged "sample" in product.json are previews: shown in local development only
    const reviews: Review[] = this.productData.reviews || []
    this.reviewArr = isDevMode() ? reviews : reviews.filter(review => !review.sample)
    this.sampleReviews = this.reviewArr.some(review => review.sample)
    this.tipSteps = tipsFor(this.productData.category)
    this.specificationArr = (this.productData.specification || '')
      .split('\n')
      .map((line: string) => line.trim())
      .filter(Boolean)

    const link = `${window.location.origin}/product/${this.productData.id}`
    this.askProductLink = this.whatsAppLink(`أريد معرفة التفاصيل أكثر عن *(${this.productData.name})*\n${link}`, 'ProductDetail')
    this.askQuestionLink = this.whatsAppLink(`عندي سؤال عن طريقة استخدام *(${this.productData.name})*\n${link}`, 'ProductQuestion')
  }

  get averageRating(): number {
    if (!this.reviewArr.length) return 0
    return Math.round(this.reviewArr.reduce((sum, review) => sum + review.rating, 0) / this.reviewArr.length * 10) / 10
  }

  selectImage(item: string) {
    this.selectedImage = item
  }

  scrollToSection(event: Event, id: string) {
    event.preventDefault()
    this.activeSection = id
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  // Highlights the section in the middle band of the viewport
  private observeSections() {
    this.sectionObserver?.disconnect()
    if (!('IntersectionObserver' in window)) return

    this.sectionObserver = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting)
      if (visible.length) {
        // The product summary at the top counts as the details section
        const target = visible[0].target
        this.zone.run(() => this.activeSection = target.getAttribute('data-nav') || target.id)
      }
    }, { rootMargin: '-35% 0px -60% 0px' })

    this.pageSections.forEach(section => this.sectionObserver!.observe(section.nativeElement))
  }

  private whatsAppLink(message: string, type: string) {
    return `https://api.whatsapp.com/send/?phone=+2${this.service.phoneNumber}&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0&type_of_request=${type}`
  }

  private shuffle(array: any[]) {
    return array.map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
  }

}
