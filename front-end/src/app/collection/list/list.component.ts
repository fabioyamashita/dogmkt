import { Component, OnInit } from '@angular/core';

import { CollectionService } from 'src/app/services/collection.service';

import Dog from 'src/app/models/dog';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  constructor(private collectionService: CollectionService) {}

  public dogs!: Dog[];

  ngOnInit(): void {
    this.collectionService.getCollection.subscribe({
      next: (dogs: Dog[]) => (this.dogs = dogs),
      error: (err: Error) => console.error(err),
    });
  }
}
