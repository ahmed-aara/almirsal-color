import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements AfterViewInit, OnDestroy {

  statArr = [
    { value: 500, comma: false, label: 'عميل سعيد' },
    { value: 10000, comma: true, label: 'موقع عمل' },
    { value: 1000, comma: false, label: 'شركة مقاولات' },
    { value: 28, comma: false, label: 'محافظة وصلنا إليها' },
    { value: 23, comma: false, label: 'سنة من الخبرة' },
  ]

  // Count up only when the browser can tell us the stats are visible and motion is allowed
  private countUpEnabled = 'IntersectionObserver' in window
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  statDisplay = this.statArr.map(item => this.formatStat(item, this.countUpEnabled ? 0 : item.value))

  private statsObserver?: IntersectionObserver
  private countUpFrame = 0

  @ViewChild('statsGrid') statsGrid?: ElementRef<HTMLElement>

  ngAfterViewInit(): void {
    if (!this.countUpEnabled || !this.statsGrid) return;

    this.statsObserver = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        this.statsObserver?.disconnect();
        this.countUp();
      }
    }, { threshold: 0.4 });
    this.statsObserver.observe(this.statsGrid.nativeElement);
  }

  ngOnDestroy(): void {
    this.statsObserver?.disconnect()
    cancelAnimationFrame(this.countUpFrame)
  }

  /*
  * Stats count-up
  ********/
  countUp(duration = 1800) {
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      this.statDisplay = this.statArr.map(item => this.formatStat(item, Math.round(item.value * eased)));
      if (progress < 1) this.countUpFrame = requestAnimationFrame(tick);
    };

    this.countUpFrame = requestAnimationFrame(tick);
  }

  formatStat(item: { comma: boolean }, value: number) {
    return '+' + (item.comma ? value.toLocaleString('en-US') : value);
  }

}
