import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import Dog from 'src/app/models/dog';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute) {}

  unsavedChanges: boolean | undefined;
  dog!: Dog;

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ dog }) => (this.dog = dog));
    this.unsavedChanges = false;
  }

  unsavedChangesToggle(event: any): void {
    this.unsavedChanges = true;
  }
}
