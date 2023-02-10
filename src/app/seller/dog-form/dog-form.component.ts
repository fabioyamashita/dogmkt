import { ActivatedRoute, Router } from '@angular/router';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChildren,
} from '@angular/core';
import { FormBuilder, FormControlName, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { CollectionService } from 'src/app/services/collection.service';

import Dog from 'src/app/models/dog';
import { DogBreeds } from 'src/app/models/dog-breeds.enum';
import { LocalStorageUtils } from 'src/app/utils/localStorage';
import { tap, concatMap, Observable, fromEvent, merge } from 'rxjs';
import { RoutesService } from 'src/app/services/routes.service';
import { ToastrService } from 'ngx-toastr';

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
    private datePipe: DatePipe,
    private localStorageUtils: LocalStorageUtils,
    private activatedRoute: ActivatedRoute,
    private routesService: RoutesService,
    private toastr: ToastrService
  ) {}

  @ViewChildren(FormControlName, { read: ElementRef })
  formInputElements: ElementRef[] | undefined;
  @Output() unsavedChangesEvent: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  breedList: string[] = Object.keys(DogBreeds).filter((key) =>
    isNaN(Number(key))
  );

  @Input() dog?: Dog;
  createForm: any;

  regexURL: RegExp =
    /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements?.map(
      (formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur')
    )!;

    merge(...controlBlurs).subscribe(() => {
      this.unsavedChangesEvent.emit(true);
    });
  }

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

  onSubmitForm() {
    if (this.createForm.valid) {
      let dog: Dog = new Dog();

      if (this.router.url.includes('create')) {
        this.createDog(dog);
      } else {
        this.updateDog(dog);
      }

      this.unsavedChangesEvent.emit(false);
    }
  }

  createDog(dog: Dog): void {
    dog = Object.assign({}, dog, this.createForm.value);
    dog = Object.assign({}, dog, {
      sellerId: parseInt(this.localStorageUtils.getUserId()),
    });

    dog.dateOfBirth =
      this.datePipe.transform(
        this.createForm.value.dateOfBirth,
        'yyyy-MM-dd'
      ) ?? '';

    this.collectionService.createDog(dog).subscribe({
      next: () => {
        this.createForm.reset();
        this.routesService.navigateToSellerProfile();
      },
      error: (err) => {
        this.toastr.error('An error has occurred!', 'Ops...', {
          timeOut: 2000,
        });
      },
      complete: () => {
        let toast = this.toastr.success(
          `${dog.name} created!`,
          'Add a New Dog',
          {
            timeOut: 2000,
          }
        );
      },
    });
  }

  updateDog(dog: Dog): void {
    this.collectionService
      .getById(parseInt(this.activatedRoute.snapshot.paramMap.get('id') ?? ''))
      .pipe(
        tap((dogFound) => {
          dog = dogFound;
          dog = Object.assign({}, dog, this.createForm.value);
          dog = Object.assign({}, dog, {
            sellerId: parseInt(this.localStorageUtils.getUserId()),
          });

          dog.dateOfBirth =
            this.datePipe.transform(
              this.createForm.value.dateOfBirth,
              'yyyy-MM-dd'
            ) ?? '';
        }),
        concatMap(() => this.collectionService.updateDog(dog))
      )
      .subscribe({
        next: () => this.routesService.navigateToSellerProfile(),
        error: (err) => {
          this.toastr.error('An error has occurred!', 'Ops...', {
            timeOut: 2000,
          });
        },
        complete: () => {
          let toast = this.toastr.success(`${dog.name} edited!`, 'Dog Edit', {
            timeOut: 2000,
          });
        },
      });
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
