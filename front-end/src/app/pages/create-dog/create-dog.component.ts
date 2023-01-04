import { Component } from '@angular/core';

@Component({
  selector: 'app-create-dog',
  templateUrl: './create-dog.component.html',
  styleUrls: ['./create-dog.component.css'],
})
export class CreateDogComponent {
  breedList: string[] = ['Samoyed', 'Corgi'];
}
