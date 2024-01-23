import { Component, OnInit } from '@angular/core';
import { SportsService } from '../../services/sports.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ISport } from '../../interfaces/sports.interface';

@Component({
  selector: 'app-sport-page',
  templateUrl: './sport-page.component.html',
  styles: ``
})
export class SportPageComponent implements OnInit {

  public sport?: ISport;

  constructor(
    private sportService: SportsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(

      switchMap( ({id}) => this.sportService.getSportById(id))

    ).subscribe( sport => {

      if(!sport) return this.router.navigate(['/sport/list']);

      this.sport = sport;
      console.log(sport);
      return;
    })
  }


  goBack():void{
    this.router.navigateByUrl('sport/list')
  }
}
