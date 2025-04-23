import { Component, inject } from '@angular/core';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  app = inject(AppComponent);

}
