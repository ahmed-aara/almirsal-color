import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { CarouselSwipe } from '../carousel-swipe';

@Component({
  selector: 'app-projects-carousel',
  templateUrl: './projects-carousel.component.html',
  styleUrls: ['./projects-carousel.component.scss']
})
export class ProjectsCarouselComponent implements OnInit {

  // Loaded from assets/json/project.json, in the order listed there
  projectArr: any = []

  //variable
  projectPos = 0
  featured: any = null
  cards: any[] = []
  swipe = new CarouselSwipe()

  // Cards shown beside the featured project (CSS hides the last one on phones)
  readonly cardCount = 3

  constructor(private service: ServiceService) { }

  ngOnInit(): void {
    this.getProject()
  }

  getProject() {
    this.service.getProject().subscribe(
      response => {
        this.projectArr = response
        this.show(0)
      },
      err => {
        console.log(err)
      }
    )
  }

  trackById(index: number, item: any) {
    return item.id
  }

  /*
  * Carousel
  * The project at projectPos is featured in the large photo and the next ones
  * are shown as cards, wrapping round to the start of the list.
  ********/
  show(pos: number) {
    const count = this.projectArr.length;
    if (!count) return;

    this.projectPos = (pos + count) % count;
    this.featured = this.projectArr[this.projectPos];
    this.cards = Array.from({ length: Math.min(this.cardCount, count - 1) },
      (_, i) => this.projectArr[(this.projectPos + i + 1) % count]);
  }

  next() {
    this.show(this.projectPos + 1);
  }

  prev() {
    this.show(this.projectPos - 1);
  }

  onSwipe(event: TouchEvent) {
    const step = this.swipe.step(event);
    if (step) this.show(this.projectPos + step);
  }

}
