import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { CarouselSwipe, clampSlide } from '../carousel-swipe';

@Component({
  selector: 'app-projects-carousel',
  templateUrl: './projects-carousel.component.html',
  styleUrls: ['./projects-carousel.component.scss']
})
export class ProjectsCarouselComponent implements OnInit, OnDestroy {

  // Loaded from assets/json/project.json, in the order listed there
  projectArr: any = []

  //variable
  isWide = false
  projectPos = 0
  swipe = new CarouselSwipe()

  private wideQuery = window.matchMedia('(min-width: 960px)')
  private onWideChange = () => this.zone.run(() => this.setWide(this.wideQuery.matches))

  constructor(private service: ServiceService, private zone: NgZone) { }

  ngOnInit(): void {
    this.getProject()
    this.setWide(this.wideQuery.matches)
    this.wideQuery.addEventListener('change', this.onWideChange)
  }

  ngOnDestroy(): void {
    this.wideQuery.removeEventListener('change', this.onWideChange)
  }

  getProject() {
    this.service.getProject().subscribe(
      response => {
        this.projectArr = response
        this.setWide(this.isWide)
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
  * A position is the slide index centred in the viewport. On wide screens the
  * carousel centres the gap between two cards, as in the design.
  ********/
  setWide(wide: boolean) {
    this.isWide = wide;
    this.projectPos = Math.floor((this.projectPositions.length - 1) / 2);
  }

  get projectPositions(): number[] {
    const count = this.isWide ? this.projectArr.length - 1 : this.projectArr.length;
    return Array.from({ length: Math.max(count, 1) }, (_, i) => i);
  }

  get projectOffset(): number {
    const center = this.isWide ? this.projectPos + 0.5 : this.projectPos;
    return center - (this.projectArr.length - 1) / 2;
  }

  onSwipe(event: TouchEvent) {
    this.projectPos = clampSlide(this.projectPos + this.swipe.step(event), this.projectPositions.length);
  }

}
