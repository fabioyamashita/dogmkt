import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import Dog from 'src/app/collection/models/dog';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ dog }) => (this.dog = dog));
  }

  dog!: Dog;
}
