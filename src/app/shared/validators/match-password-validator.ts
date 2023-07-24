import { FormGroup, ValidatorFn } from "@angular/forms";

export function matchPasswordValidator (passCtrl: string, rePassCtrl: string): ValidatorFn {

    return (control) => {
        const group = control as FormGroup;
        const pass = group.get(passCtrl);
        const rePass = group.get(rePassCtrl);

        return pass?.value === rePass?.value ? null : {matchPasswordValidator: true}
    }
}