import { Component } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  template: ''
})
export abstract class BaseFormComponent {

  // the form model
  form!: FormGroup;

  constructor() { }

  getErrors(control: AbstractControl, displayName: string): string[] {
    let errors: string[] = [];

    Object.keys(control.errors || {}).forEach((key) => {
      switch (key) {
        case "required":
          errors.push(`${displayName} is required.`);
          break;
        case "pattern":
          errors.push(`${displayName} contains invalid characters.`);
          break;
        case "isDupeField":
          errors.push(`${displayName} already exists: please choose another value.`);
          break;
        default:
          errors.push(`${displayName} is invalid.`);
          break;
      }
    });

    return errors;
  }
}
