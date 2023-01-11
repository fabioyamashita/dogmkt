import { Component, OnInit } from '@angular/core';

import { CollectionService } from 'src/app/collection/services/collection.service';

import Dog from 'src/app/collection/models/dog';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  constructor(private collectionService: CollectionService) {}

  public dogs?: Dog[];

  ngOnInit(): void {
    this.collectionService.getAll.subscribe({
      next: (dogs: Dog[]) => (this.dogs = dogs),
      error: (err: Error) => console.error(err),
    });
  }
}
