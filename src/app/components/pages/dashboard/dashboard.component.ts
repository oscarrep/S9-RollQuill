import { Component, inject } from '@angular/core';
import { SectionCharacterComponent } from "../../sections/section-character/section-character.component";
import { SectionCompendiumComponent } from '../../sections/section-compendium/section-copendium.component';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { User } from '../../../interfaces/user';
@Component({
  selector: 'app-dashboard',
  imports: [SectionCharacterComponent, SectionCompendiumComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  private route = inject(ActivatedRoute)
  private _apiService = inject(ApiService)
  user?: User;

  ngOnInit() {
    const uid = this.route.snapshot.paramMap.get('uid');
    if (uid) {
      this._apiService.getUser(uid).subscribe((data: User) => {
        this.user = data;
        console.log(this.user);
      })
    }
  }
}