import { Component, Input } from '@angular/core';

@Component({
  selector: 'avans-nx-project-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  @Input() title!: string;
  isNavbarCollapsed = true;
}
