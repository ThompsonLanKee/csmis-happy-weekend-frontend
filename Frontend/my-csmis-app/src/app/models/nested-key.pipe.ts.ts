import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nestedKey'
})
export class NestedKeyPipe implements PipeTransform {

  transform(value: any, key: string): any {
    if (!value || !key) return null;

    // Split the key string to handle nested properties
    const keys = key.split('.');

    // Reduce the value to reach the nested property
    return keys.reduce((result, key) => (result ? result[key] : null), value);
  }
}
