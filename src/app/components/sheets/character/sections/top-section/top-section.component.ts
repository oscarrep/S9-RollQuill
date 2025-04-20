import { Component, input } from '@angular/core';
import { BoxComponent } from "../box/box.component";
import { ButtonComponent } from "../../../../button/button.component";

@Component({
  selector: 'app-top-section',
  imports: [BoxComponent, ButtonComponent],
  templateUrl: './top-section.component.html',
  styleUrl: './top-section.component.scss'
})
export class TopSectionComponent {

}
