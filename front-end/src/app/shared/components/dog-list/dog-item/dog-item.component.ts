import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import Dog from 'src/app/models/dog';

@Component({
  selector: 'app-dog-item',
  templateUrl: './dog-item.component.html',
  styleUrls: ['./dog-item.component.css'],
})
export class DogItemComponent {
  constructor(public router: Router) {}

  @Input() dog!: Dog;
}
