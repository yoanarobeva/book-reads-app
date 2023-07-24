import { ValidatorFn } from '@angular/forms';

export function appEmailValidator(domains: string[]): ValidatorFn {
  const domainsString = domains.join('|');
  const regExp = new RegExp(`[^@]{6,}@gmail\.(${domainsString})$`);

  return (control) =>
    control.value === '' || regExp.test(control.value)
      ? null
      : { appEmailValidator: true };
}
