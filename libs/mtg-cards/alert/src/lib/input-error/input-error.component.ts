import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-field-error-display',
  templateUrl: './input-error.component.html',
  styleUrls: ['./input-error.component.css'],
})
export class FieldErrorDisplayComponent {
  @Input() errorMsg: string | undefined;
  @Input() displayError: boolean | undefined;
}
