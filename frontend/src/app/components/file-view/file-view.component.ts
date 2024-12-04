import { Component, Input, Output, EventEmitter } from '@angular/core';

interface ImageData {
  id: number;
  name: string;
  file: File;
  imageUrl: string;
}

@Component({
  selector: 'app-file-view',
  templateUrl: './file-view.component.html',
  styleUrls: ['./file-view.component.css']
})
export class FileViewComponent {
  @Input() image: ImageData | null = null;
  @Output() closeModal = new EventEmitter<void>();
}
