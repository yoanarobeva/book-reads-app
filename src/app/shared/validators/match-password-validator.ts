import { ValidatorFn } from "@angular/forms";

export function matchPasswordValidator (pass: string): ValidatorFn {

    return (control) => control.value === '' || pass === control.value
        ? null 
        : {matchPasswordValidator: true}
    
}