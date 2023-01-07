import { Component, Input } from '@angular/core';

import Dog from 'src/app/models/dog';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent {
  @Input() dog!: Dog;
}
