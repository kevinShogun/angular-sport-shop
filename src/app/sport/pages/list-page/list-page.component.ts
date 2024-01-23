import { Component, OnInit } from '@angular/core';
import { ISport } from '../../interfaces/sports.interface';
import { SportsService } from '../../services/sports.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: ``,
})
export class ListPageComponent implements OnInit {

  public sports: ISport[] = [];

  constructor(private sportService: SportsService) {}

  ngOnInit(): void {
    this.sportService.getSports().subscribe((sports) => (this.sports = sports));
  }
}
