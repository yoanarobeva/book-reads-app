import { Directive, OnChanges, Input, SimpleChanges } from '@angular/core';
import {
  NG_VALIDATORS,
  Validator,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from "@angular/forms";
import { matchPasswordValidator } from './match-password-validator';

@Directive({
  selector: '[appMatchPassword]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: MatchPasswordDirective,
    multi: true,
  }],
})
export class MatchPasswordDirective implements Validator, OnChanges {
  @Input() appMatchPassword: string = "";

  validator: ValidatorFn = () => null;

  constructor() { }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return this.validator(control);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const currentPassChanges = changes['appMatchPassword'];

    if (currentPassChanges) {
      this.validator = matchPasswordValidator(currentPassChanges.currentValue);
    }
  }
}
