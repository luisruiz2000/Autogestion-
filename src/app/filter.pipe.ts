import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], filterBy: string): any {
    
    return items.filter(item => item.id.toString().indexOf(filterBy) !== -1);
}

}
