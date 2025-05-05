import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { InputComponent } from "../../input/input.component";
import { ButtonComponent } from "../../button/button.component";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-img-modal',
  standalone: true,
  imports: [InputComponent, ButtonComponent],
  templateUrl: './img-modal.component.html',
  styleUrl: './img-modal.component.scss'
})
export class ImgModalComponent {
  @Input() characterId!: string;
  @Output() updated = new EventEmitter<number>();
  @Output() onClose = new EventEmitter<void>();
  http = inject(HttpClient);
  imgUrl: string = '';
  file = null;


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

      }
    });

    widget.open();
  }

  apply(): void {

  }

  close(): void {
    this.onClose.emit();
  }
}
