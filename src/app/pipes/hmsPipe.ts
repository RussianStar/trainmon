import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'secondsToHmsPipe'})
export class SecondsToHmsPipe implements PipeTransform {
  transform(value: number): string {
    const hours = Math.floor(value / 3600);
    const minutes = Math.floor((value % 3600) / 60);
    const seconds = value % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  }
}