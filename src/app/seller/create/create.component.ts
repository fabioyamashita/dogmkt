import { Component } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent {
  unsavedChanges: boolean | undefined;

  unsavedChangesToggle(event: any): void {
    this.unsavedChanges = true;
  }
}
