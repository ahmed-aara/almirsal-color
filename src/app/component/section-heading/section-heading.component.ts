import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section-heading',
  templateUrl: './section-heading.component.html',
  styleUrls: ['./section-heading.component.scss']
})
export class SectionHeadingComponent {

  @Input() eyebrow = ''
  @Input() title = ''
  @Input() headingId = ''
  @Input() light = false
  @Input() align: 'center' | 'start' = 'center'
  // Short orange rule before the eyebrow
  @Input() lined = false

}
