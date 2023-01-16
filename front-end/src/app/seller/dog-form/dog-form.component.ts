import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CurrencyPipe, DatePipe } from '@angular/common';

import { CollectionService } from 'src/app/services/collection.service';

import Dog from 'src/app/models/dog';
import { DogBreeds } from 'src/app/models/dog-breeds.enum';

@Component({
  selector: 'app-dog-form',
  templateUrl: './dog-form.component.html',
  styleUrls: ['./dog-form.component.css'],
})
export class DogFormComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private collectionService: CollectionService,
    public router: Router,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.createForm = this.fb.group({
      name: [this.dog?.name, Validators.required],
      breed: [this.dog?.breed, Validators.required],
      genre: [this.dog?.genre, Validators.required],
      price: [this.dog?.price, [Validators.required, Validators.min(0.1)]],
      availableQuantity: [
        this.dog?.availableQuantity,
        [Validators.required, Validators.min(1)],
      ],
      description: [this.dog?.description, Validators.required],
      dateOfBirth: [this.dog?.dateOfBirth, Validators.required],
      weight: [this.dog?.weight, Validators.required],
      height: [this.dog?.height, Validators.required],
      width: [this.dog?.width, Validators.required],
      pictureUrl: [this.dog?.pictureUrl, Validators.pattern(this.regexURL)],
    });
  }

  breedList: string[] = Object.keys(DogBreeds).filter((key) =>
    isNaN(Number(key))
  );

  @Input() dog?: Dog;
  createForm: any;

  regexURL: RegExp =
    /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;

  onSubmitForm() {
    if (this.createForm.dirty && this.createForm.valid) {
      let dog: Dog = new Dog();
      dog = Object.assign({}, dog, this.createForm.value);
      dog.dateOfBirth =
        this.datePipe.transform(
          this.createForm.value.dateOfBirth,
          'yyyy-MM-dd'
        ) ?? '';

      if (this.router.url.includes('create'))
        this.collectionService.createDog(dog).subscribe();
      else {
        dog.id = this.dog?.id;
        this.collectionService.updateDog(dog).subscribe();
      }
    }
  }

  inputIsValid(formControlName: string): boolean {
    return (
      ((this.createForm.get(formControlName)?.dirty ||
        this.createForm.get(formControlName)?.touched) &&
        !this.createForm.get(formControlName)?.valid) ??
      false
    );
  }
}