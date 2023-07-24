import { Directive, OnChanges, Input, SimpleChanges } from '@angular/core';
import {
  NG_VALIDATORS,
  Validator,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,


} from "@angular/forms";
import { appEmailValidator } from './email-validator';

@Directive({
  selector: '[appEmail]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: EmailDirective,
    multi: true,
  }],
})

export class EmailDirective implements Validator, OnChanges {
  @Input() appEmail: string[] = [];

  validator: ValidatorFn = () => null;

  constructor() { }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return this.validator(control);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const currentEmailChanges = changes['appEmail'];

    if (currentEmailChanges) {
      this.validator = appEmailValidator(currentEmailChanges.currentValue);
    }
  }

}
