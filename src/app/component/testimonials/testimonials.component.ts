import { Component } from '@angular/core';
import { IMG } from 'src/app/page/landing-page/landing-assets';
import { CarouselSwipe, clampSlide } from '../carousel-swipe';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent {

  img = IMG

  // TODO: replace with real customer reviews; these are sample reviews
  testimonialArr = [
    {
      rating: 5,
      text: 'استخدمت دهانات المرسال كلر في شقتي الجديدة والنتيجة فاقت توقعاتي. الألوان ثابتة والتغطية ممتازة من أول وش، وفريق المبيعات ساعدني أختار الدرجات المناسبة لكل غرفة.',
      name: 'محمد عبد الرحمن',
    },
    {
      rating: 5,
      text: 'تعاملنا معهم في مشروع عمارة سكنية كاملة. الالتزام بمواعيد التوريد كان ممتاز والجودة واحدة في كل الدفعات، وده فرق معانا جداً في التشطيب النهائي.',
      name: 'م. أحمد سامي',
    },
    {
      rating: 5,
      text: 'الدهان الخارجي استحمل الشمس والرطوبة لأكثر من سنتين من غير ما يبهت أو يتقشر. أنصح بيه أي حد بيدور على جودة حقيقية بسعر معقول.',
      name: 'سارة حسن',
    },
    {
      rating: 5,
      text: 'كمقاول بشتغل بمنتجات كتير، لكن المرسال كلر من أسهل الدهانات في الاستخدام. التشطيب ناعم والرائحة خفيفة، والعملاء دايماً مبسوطين من النتيجة.',
      name: 'خالد إبراهيم',
    },
    {
      rating: 5,
      text: 'طلبت عرض سعر على واتساب ورد عليا فوراً، والتوصيل وصل في نفس الأسبوع. الخدمة محترمة جداً والمنتج على قد الكلام.',
      name: 'منى عادل',
    },
  ]

  //variable
  testimonialPos = Math.floor((this.testimonialArr.length - 1) / 2)
  swipe = new CarouselSwipe()

  // The slide index centred in the viewport
  get testimonialOffset(): number {
    return this.testimonialPos - (this.testimonialArr.length - 1) / 2;
  }

  onSwipe(event: TouchEvent) {
    this.testimonialPos = clampSlide(this.testimonialPos + this.swipe.step(event), this.testimonialArr.length);
  }

}
