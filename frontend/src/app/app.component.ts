import { Component } from '@angular/core';
import { DetectionService } from './services/detection.service';

interface ImageData {
  id: number;
  name: string;
  file: File;
  imageUrl: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isSidebarActive: boolean = false;
  images: ImageData[] = [];
  imageIdCounter = 1;
  selectedImage: ImageData | null = null;
  selectedSection: string = '';

  sectionImages: { [key: string]: string } = {
    'Introducción': '/assets/images/oso.png',
    'Objetivos': '/assets/images/loro.png',
    'Metodología': '/assets/images/tortuga.png',
    'Resultados': '/assets/images/jaguar.png',
    'Conclusiones': '/assets/images/mono.png'
  };

  constructor(private detectionService: DetectionService) {}

  onFilesSelected(files: File[]): void {
    files.forEach(file => {
      if (this.images.length < 50 && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.images.push({
            id: this.imageIdCounter++,
            name: file.name,
            file,
            imageUrl: e.target.result
          });
        };
        reader.readAsDataURL(file);
      }
    });
  }

  deleteImage(imageId: number): void {
    this.images = this.images.filter(image => image.id !== imageId);
  }

  openModal(image: ImageData): void {
    this.selectedImage = image;
  }

  closeModal(): void {
    this.selectedImage = null;
  }

  detectAnimal(image: ImageData): void {
    this.detectionService.detectAnimal(image.file).subscribe(
      (response) => {
        const imageUrl = URL.createObjectURL(response);
        // Actualiza la imagen en la lista con el resultado procesado
        this.images = this.images.map((img) =>
          img.id === image.id ? { ...img, imageUrl } : img
        );
      },
      (error) => {
        alert('Error al procesar la imagen: ' + error.message);
      }
    );
  }
  
  onSectionSelected(section: string) {
    this.selectedSection = section;
  }

  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
  }

  get currentImageUrl(): string {
    return this.sectionImages[this.selectedSection] || '';
  }

  onSectionSelect(section: string) {
    this.selectedSection = section;
  }
  
}
