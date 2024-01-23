import { Component, Input, OnInit } from '@angular/core';
import { ISport } from '../../interfaces/sports.interface';

@Component({
  selector: 'sports-sport-card',
  templateUrl: './card.component.html',
  styles: ``,
})
export class CardComponent implements OnInit {
  @Input()
  public sport!: ISport;

  ngOnInit(): void {
    if (!this.sport) throw Error('Sport is required');
  }
}
