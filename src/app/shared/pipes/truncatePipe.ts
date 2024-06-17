
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit = 170, completeWords = false, ellipsis = '...'): string {
    if (!value) {
      return '';
    }

    if (completeWords && value.length > limit) {
      limit = value.substr(0, limit).lastIndexOf(' ');
    }

    if (value.length <= limit) {
      return value;
    } else {
      return `${value.substr(0, limit)}${ellipsis}`;
    }
  }
}
