import { Component, ViewChild } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-tooltip',
  imports: [MatTooltip],
  standalone: true,
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.scss'
})
export class TooltipComponent {
  @ViewChild(MatTooltip) tooltip!: MatTooltip;
  tooltipText = '';
  pressTimeout: any;

  startPress() {
    this.pressTimeout = setTimeout(() => {
      this.tooltip.disabled = false;
      this.tooltip.show();
    }, 300);
  }

  cancelPress() {
    clearTimeout(this.pressTimeout);
  }
}
