import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-sidebar',
  templateUrl: './info-sidebar.component.html',
  styleUrls: ['./info-sidebar.component.css']
})
export class InfoSidebarComponent {
  @Input() imageUrl: string = '';
  @Input() title: string = '';
  @Input() text: string = '';
}
