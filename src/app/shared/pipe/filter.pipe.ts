import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {
 
  transform(items: any[], filterBy: string): any {
    console.log("Items->"+ JSON.stringify(items));
    if(filterBy !== '') return items.filter(item => item.categoria === filterBy);
    else return items
}

}
