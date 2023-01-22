import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search-area',
  templateUrl: './search-area.component.html',
  styleUrls: ['./search-area.component.css'],
})
export class SearchAreaComponent implements OnInit {
  searchField: FormControl = new FormControl();

  @Output() searchEvent: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {
    this.searchField.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((search) => {
        this.searchEvent.emit(search);
      });
  }
}
