import {Pipe, PipeTransform} from '@angular/core';
import {CoffeeRequestStatusValue} from '../../coffee-request';

@Pipe({
  name: 'appStatusValue',
})
export class StatusValuePipe implements PipeTransform {
  transform(value: CoffeeRequestStatusValue): number {
    switch (value) {
      case CoffeeRequestStatusValue.requested:
        return 0;
      case CoffeeRequestStatusValue.assigned:
        return 10;
      case CoffeeRequestStatusValue.making:
        return 33;
      case CoffeeRequestStatusValue.done:
        return 66;
      case CoffeeRequestStatusValue.pickedUp:
        return 100;
    }
  }
}
