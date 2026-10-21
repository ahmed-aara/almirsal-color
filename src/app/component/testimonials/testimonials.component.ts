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

  // TODO: replace with real customer reviews; text is the placeholder copy from the Figma design
  testimonialArr = [1, 2, 3].map(() => ({
    rating: 5,
    text: 'هو ببساطة نص شكلي (بمعنى أن الغاية هي الشكل وليس المحتوى) ويُستخدم في صناعات المطابع ودور النشر. كان لوريم إيبسوم ولايزال المعيار للنص الشكلي منذ القرن الخامس عشر عندما قامت مطبعة مجهولة',
    name: 'احمد محمد',
  }))

  //variable
  testimonialPos = 1
  swipe = new CarouselSwipe()

  // The slide index centred in the viewport
  get testimonialOffset(): number {
    return this.testimonialPos - (this.testimonialArr.length - 1) / 2;
  }

  onSwipe(event: TouchEvent) {
    this.testimonialPos = clampSlide(this.testimonialPos + this.swipe.step(event), this.testimonialArr.length);
  }

}
