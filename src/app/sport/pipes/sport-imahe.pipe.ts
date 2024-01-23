import { Pipe, PipeTransform } from '@angular/core';
import { ISport } from '../interfaces/sports.interface';

@Pipe({
  name: 'sportImage'
})
export class SportImagePipe implements PipeTransform {

  transform(sport: ISport): string {

    if(sport.alt_img){
      return sport.alt_img;
    }

    if(!sport.id && !sport.alt_img ){
      return 'assets/no-image.jpg';
    }

    return `assets/images/${sport.id}.jpeg`;
  }

}
