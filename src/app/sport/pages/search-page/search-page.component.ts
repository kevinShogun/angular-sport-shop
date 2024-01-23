import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ISport } from '../../interfaces/sports.interface';
import { SportsService } from '../../services/sports.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: ``,
})
export class SearchPageComponent {
  public searchInput = new FormControl('');
  public sports: ISport[] = [];
  public selectSport?: ISport;

  constructor(private sportService: SportsService) {}

  searchSport() {
    const value: string = this.searchInput.value || '';
    this.sportService
      .getSuggestions(value)
      .subscribe((sports) => (this.sports = sports));
  }

  onSelectedOption(event: MatAutocompleteSelectedEvent): void {
    if (!event.option.value) {
      this.selectSport = undefined;
      return;
    }

    const sport: ISport = event.option.value;

    this.searchInput.setValue(sport.name);
    this.selectSport = sport;
  }
}
