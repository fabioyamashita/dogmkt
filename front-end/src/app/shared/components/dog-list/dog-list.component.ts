import { Component, Input } from '@angular/core';
import Dog from 'src/app/models/dog';

@Component({
  selector: 'app-dog-list',
  templateUrl: './dog-list.component.html',
  styleUrls: ['./dog-list.component.css'],
})
export class DogListComponent {
  @Input() dogs!: Dog[];
}
