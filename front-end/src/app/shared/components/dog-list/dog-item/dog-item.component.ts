import { Component, Input } from '@angular/core';

import Dog from 'src/app/models/dog';

@Component({
  selector: 'app-dog-item',
  templateUrl: './dog-item.component.html',
  styleUrls: ['./dog-item.component.css'],
})
export class DogItemComponent {
  @Input() dog!: Dog;
}
