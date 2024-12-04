import { Component, ElementRef, OnInit, OnDestroy, AfterViewInit, HostListener } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-earth-animation',
  templateUrl: './earth-animation.component.html',
  styleUrls: ['./earth-animation.component.css']
})
export class EarthAnimationComponent implements OnInit, OnDestroy, AfterViewInit {
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private earth!: THREE.Points;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60, 1, 0.1, 10);
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.el.nativeElement.querySelector('.earth-animation-container').appendChild(this.renderer.domElement);

    // Aumenta el tamaño de la esfera para que llene más el espacio
    const geometry = new THREE.SphereGeometry(5, 40, 40);
    const material = new THREE.PointsMaterial({ color: 0x33CCFF, size: 0.07 });
    this.earth = new THREE.Points(geometry, material);
    this.scene.add(this.earth);

    this.camera.position.z = 10; // Ajusta la distancia de la cámara para encajar mejor en el cuadro
    this.animate();
  }

  ngAfterViewInit(): void {
    this.resizeRenderer();
  }

  ngOnDestroy(): void {
    this.renderer.dispose();
  }

  private animate = () => {
    requestAnimationFrame(this.animate);
    this.earth.rotation.y += 0.001; // Reduce la velocidad de rotación
    this.renderer.render(this.scene, this.camera);
  };

  @HostListener('window:resize')
  private resizeRenderer(): void {
    const container = this.el.nativeElement.querySelector('.earth-animation-container');
    const width = container.clientWidth;
    const height = container.clientHeight;

    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }
}
