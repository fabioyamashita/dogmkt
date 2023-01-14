import { Component } from '@angular/core';
import Dog from 'src/app/models/dog';
import { CollectionService } from 'src/app/services/collection.service';

@Component({
  selector: 'app-seller-profile',
  templateUrl: './seller-profile.component.html',
  styleUrls: ['./seller-profile.component.css'],
})
export class SellerProfileComponent {
  constructor(private collectionService: CollectionService) {}

  public dogs!: Dog[];
  user: any;

  ngOnInit(): void {
    this.collectionService.getCollection.subscribe({
      next: (dogs: Dog[]) => (this.dogs = dogs),
      error: (err: Error) => console.error(err),
    });

    this.user = {
      id: '1111',
      name: 'fabio',
      email: 'fabio@gmail.com',
      isSeller: true,
    };
  }
}
