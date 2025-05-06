import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ButtonComponent } from "../../button/button.component";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ApiService } from '../../../services/api.service';
import { Character } from '../../../interfaces/character';

@Component({
  selector: 'app-img-modal',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './img-modal.component.html',
  styleUrl: './img-modal.component.scss'
})
export class ImgModalComponent {
  @Input() characterId!: string;
  @Input() character!: Character;
  @Output() updated = new EventEmitter<number>();
  @Output() onClose = new EventEmitter<void>();
  http = inject(HttpClient);
  _apiService = inject(ApiService)
  imgUrl: string = '';


  loadCloudinaryWidget(): Promise<void> {
    return new Promise((resolve, reject) => {
      if ((window as any).cloudinary) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = environment.cloudinaryWidget;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Cloudinary script failed to load'));
      document.body.appendChild(script);
    });
  }

  async openUploadWidget() {
    await this.loadCloudinaryWidget();

    const cloudinary = (window as any).cloudinary;
    const widget = cloudinary.createUploadWidget({
      cloudName: environment.cloudinaryCloudName,
      uploadPreset: environment.cloudinaryPreset,
    }, (error: any, result: any) => {
      if (!error && result.event === 'success') {
        console.log('Uploaded image URL:', result.info.secure_url);
        this.imgUrl = result.info.secure_url;
      }
    });

    widget.open();
  }

  apply(character: Character): void {
    const updatedCharacter: Character = {
      ...character,
      image: this.imgUrl
    };

    this._apiService.updateCharacter(character._id, updatedCharacter).subscribe(() => {
      this.updated.emit(1);
    })
  }

  close(): void {
    this.onClose.emit();
  }
}
