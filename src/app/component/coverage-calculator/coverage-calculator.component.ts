import { Component, Input, OnChanges } from '@angular/core';

export interface Coverage {
  unit: string
  pack: string
  packsPerUnit: number
  options: { label: string, area: number }[]
}

@Component({
  selector: 'app-coverage-calculator',
  templateUrl: './coverage-calculator.component.html',
  styleUrls: ['./coverage-calculator.component.scss']
})
export class CoverageCalculatorComponent implements OnChanges {

  @Input() coverage!: Coverage

  area: number | null = 100
  optionIndex = 0
  addWaste = true

  ngOnChanges(): void {
    this.optionIndex = 0
  }

  get option() {
    return this.coverage.options[this.optionIndex]
  }

  // Area to cover, including a 10% allowance for waste when selected
  get totalArea(): number {
    const area = Math.max(Number(this.area) || 0, 0)
    return this.addWaste ? area * 1.1 : area
  }

  get packs(): number {
    const exact = this.totalArea / this.option.area * this.coverage.packsPerUnit
    // Round first so floating point noise (e.g. 110.00000000000001) doesn't add a pack
    return Math.ceil(Math.round(exact * 1000) / 1000)
  }

  get units(): number {
    return Math.round(this.totalArea / this.option.area * 100) / 100
  }

}
