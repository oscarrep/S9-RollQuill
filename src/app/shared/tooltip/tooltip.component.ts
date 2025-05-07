import { Component, Input } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-tooltip',
  imports: [MatTooltip],
  standalone: true,
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.scss'
})
export class TooltipComponent {
  @Input() tooltipText = '';
  pressTimeout: any;

  startPress(tooltip: MatTooltip) {
    this.pressTimeout = setTimeout(() => {
      tooltip.disabled = false;
      tooltip.show();
    }, 300);
  }

  cancelPress(tooltip: MatTooltip) {
    clearTimeout(this.pressTimeout);
    tooltip.hide();
    tooltip.disabled = true;
  }
}
