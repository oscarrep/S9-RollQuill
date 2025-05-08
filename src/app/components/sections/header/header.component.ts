import { Component, inject } from '@angular/core';
import { AppComponent } from '../../../app.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  app = inject(AppComponent);
  route = inject(ActivatedRoute);

  userId: string = ''
  constructor() {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('uid')!;
    });
  }

  
}
