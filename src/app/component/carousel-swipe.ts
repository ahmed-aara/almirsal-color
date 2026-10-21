// Swipe handling for the RTL carousels: call start() on touchstart and step() on touchend
export class CarouselSwipe {

  private startX: number | null = null

  start(event: TouchEvent) {
    this.startX = event.changedTouches[0].clientX;
  }

  // 1 for the next slide, -1 for the previous one, 0 when the swipe was too short
  step(event: TouchEvent): number {
    if (this.startX === null) return 0;
    const delta = event.changedTouches[0].clientX - this.startX;
    this.startX = null;
    if (Math.abs(delta) < 40) return 0;

    // RTL: swiping left reveals the next slide
    return delta < 0 ? 1 : -1;
  }

}

export function clampSlide(pos: number, count: number) {
  return Math.min(Math.max(pos, 0), count - 1);
}
