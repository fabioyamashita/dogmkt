import { Component, OnInit } from '@angular/core';

import { CollectionService } from 'src/app/services/collection.service';

import Dog from 'src/app/models/dog';
import { LocalStorageUtils } from 'src/app/utils/localStorage';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  constructor(
    private collectionService: CollectionService,
    private localStorageUtils: LocalStorageUtils
  ) {}

  public dogs!: Dog[];

  ngOnInit(): void {
    this.collectionService.getCollection.subscribe({
      next: (dogs: Dog[]) => (this.dogs = dogs),

      // Se eu não quiser mostrar os próprios cachorros
      // (this.dogs = dogs.filter(
      //   (dog) => dog.sellerId != parseInt(this.localStorageUtils.getUserId())
      // )),

      error: (err: Error) => console.error(err),
    });
  }
}
