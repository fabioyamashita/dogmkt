import { Component, OnInit } from '@angular/core';

import { CollectionService } from 'src/app/services/collection.service';

import Dog from 'src/app/models/dog';
import { HttpError } from 'src/app/utils/httpError';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  constructor(
    private collectionService: CollectionService,
    private httpError: HttpError,
    private activatedRoute: ActivatedRoute
  ) {}

  public dogs!: Dog[];

  ngOnInit(): void {
    this.activatedRoute.data.subscribe({
      next: ({ dogs }) => {
        this.dogs = dogs;
      },

      error: (err) => {
        this.httpError.process(err.status);
      },
    });
  }

  searchCollection(event: any): void {
    this.collectionService.getCollection.subscribe({
      next: (dogs: Dog[]) =>
        (this.dogs = dogs.filter((dog) =>
          dog.name?.toUpperCase().includes(event.toString().toUpperCase())
        )),
    });
  }
}
