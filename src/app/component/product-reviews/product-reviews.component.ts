import { Component, Input, OnChanges } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';

export interface Review {
  name: string
  rating: number
  comment: string
  date?: string
}

// Reviews come from the product's "reviews" array in assets/json/product.json.
// New reviews are sent to the company on WhatsApp so they can be checked and published.
@Component({
  selector: 'app-product-reviews',
  templateUrl: './product-reviews.component.html',
  styleUrls: ['./product-reviews.component.scss']
})
export class ProductReviewsComponent implements OnChanges {

  @Input() productId = ''
  @Input() productName = ''
  @Input() reviews: Review[] = []
  // Preview data shown only in local development
  @Input() sample = false

  stars = [1, 2, 3, 4, 5]
  ratingLabels = ['', 'سيء', 'مقبول', 'جيد', 'جيد جداً', 'ممتاز']

  //Data
  form = { rating: 0, name: '', comment: '' }
  hoverRating = 0
  error_msg = ''
  sent = false

  ngOnChanges(): void {
    this.form = { rating: 0, name: '', comment: '' }
    this.error_msg = ''
    this.sent = false
  }

  constructor(private service: ServiceService) { }

  get average(): number {
    if (!this.reviews.length) return 0
    const total = this.reviews.reduce((sum, review) => sum + review.rating, 0)
    return Math.round(total / this.reviews.length * 10) / 10
  }

  // Share of reviews for each star value, 5 to 1
  get distribution() {
    return [5, 4, 3, 2, 1].map(stars => {
      const count = this.reviews.filter(review => Math.round(review.rating) === stars).length
      return { stars, count, percent: this.reviews.length ? count / this.reviews.length * 100 : 0 }
    })
  }

  get shownRating(): number {
    return this.hoverRating || this.form.rating
  }

  setRating(value: number) {
    this.form.rating = value
    this.error_msg = ''
  }

  submit() {
    this.error_msg = ''
    const { rating, name, comment } = this.form

    if (!rating) {
      this.error_msg = 'اختر عدد النجوم أولاً'
      return
    }
    if (!name.trim() || !comment.trim()) {
      this.error_msg = 'يجب استكمال البيانات'
      return
    }

    const text = `تقييم جديد للمنتج: ${this.productName} (${this.productId})\nالتقييم: ${'★'.repeat(rating)}${'☆'.repeat(5 - rating)} (${rating}/5)\nالاسم: ${name.trim()}\nالتعليق: ${comment.trim()}`
    const link = `https://api.whatsapp.com/send/?phone=+2${this.service.phoneNumber}&text=${encodeURIComponent(text)}&type=phone_number&app_absent=0&type_of_request=ProductReview`
    window.open(link, '_blank')
    this.sent = true
  }

  reset() {
    this.form = { rating: 0, name: '', comment: '' }
    this.sent = false
  }

}
