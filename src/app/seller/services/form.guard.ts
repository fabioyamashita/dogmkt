import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

import { EditComponent } from '../edit/edit.component';
import { CreateComponent } from '../create/create.component';

@Injectable()
export class FormGuard
  implements CanDeactivate<EditComponent | CreateComponent>
{
  canDeactivate(component: EditComponent | CreateComponent) {
    if (component.unsavedChanges) {
      return window.confirm(
        'WARNING: You have unsaved changes. If you leave before saving, your changes will be lost.'
      );
    }

    return true;
  }
}
