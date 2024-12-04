import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { DetectionService } from 'src/app/services/detection.service';

interface ImageData {
  id: number;
  name: string;
  file: File;
  imageUrl: string;
  isProcessing?: boolean; // Para indicar si la imagen está en procesamiento
  isDetected?: boolean; // Para indicar si la detección ya se completó
}

@Component({
  selector: 'app-file-table',
  templateUrl: './file-table.component.html',
  styleUrls: ['./file-table.component.css'],
})
export class FileTableComponent {
  selectedImage: string | null = null;

  @Input() images: ImageData[] = [];
  @Output() deleteImage = new EventEmitter<number>();
  @Output() viewImage = new EventEmitter<ImageData>();
  @Output() detectImage = new EventEmitter<ImageData>();

  page: number = 1; // Página inicial para la paginación

  @ViewChild('imageModal') imageModal!: ElementRef;

  constructor(private detectionService: DetectionService) {}

  openImageModal(imageUrl: string): void {
    this.selectedImage = imageUrl;
    const modalElement = this.imageModal.nativeElement;
    if (modalElement) {
      const modal = new window.bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  detectAnimal(image: ImageData): void {
    // Marcar la imagen como "en procesamiento"
    image.isProcessing = true;

    // Llamar al servicio para detectar el animal
    this.detectionService.detectAnimal(image.file).subscribe(
      (response) => {
        // Convertir el blob en una URL de imagen procesada
        const imageUrl = URL.createObjectURL(response);
        image.imageUrl = imageUrl; // Actualizar la URL de la imagen con el resultado procesado
        image.isProcessing = false; // Finalizar el estado de procesamiento
        image.isDetected = true; // Marcar como detectado (asegura deshabilitación)
      },
      (error) => {
        alert('Error al procesar la imagen: ' + error.message);
        image.isProcessing = false; // Finalizar el estado de procesamiento incluso en caso de error
      }
    );
  }
}
