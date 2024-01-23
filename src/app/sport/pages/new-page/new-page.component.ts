import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { filter, switchMap, take } from 'rxjs';
import { Category, ISport } from '../../interfaces/sports.interface';
import { SportsService } from '../../services/sports.service';
import { DialogConfirmationComponent } from '../../components/dialog-confirmation/dialog-confirmation.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: ``,
})
export class NewPageComponent implements OnInit {
  public sportForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', { nonNullable: true }),
    price: new FormControl(0),
    description: new FormControl(''),
    size: new FormControl<string[]>(['']),
    colors: new FormControl<string[]>(['']),
    category: new FormControl<Category>('T-shirts'),
    alt_img: new FormControl(''),
  });

  public sizes = [
    { id: 'S', value: 'Talla S' },
    { id: 'M', value: 'Talla M' },
    { id: 'L', value: 'Talla L' },
    { id: 'XL', value: 'Talla XL' },
    { id: '45', value: 'Número 45 global / 7.5 Americano' },
    { id: '35', value: 'Número 35 global / 6.5 Americano' },
    { id: '40', value: 'Número 40 global / 7 Americano' },
    { id: '30', value: 'Número 30 global / 6 Americano' },
  ];

  public colors = [
    { id: 'Green', value: 'Verde' },
    { id: 'Blue', value: 'Azul' },
    { id: 'Black', value: 'Negro' },
    { id: 'White', value: 'Blanco' },
    { id: 'Red', value: 'Rojo' },
  ];

  public categories = [
    { id: 'Accessories', value: 'Accesorios' },
    { id: 'Shoes', value: 'Zapatos' },
    { id: 'Socks', value: 'Calcetas' },
    { id: 'T-shirts', value: 'Camisas' },
    { id: 'Pants', value: 'Pantalones' },
  ];

  constructor(
    private sportService: SportsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;

    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.sportService.getSportById(id)))
      .subscribe((sport) => {
        if (!sport) return this.router.navigateByUrl('/');

        this.sportForm.reset(sport);
        return;
      });
  }

  get currentSport(): ISport {
    const sport = this.sportForm.value as ISport;
    return sport;
  }

  onSubmit(): void {
    if (this.currentSport.id) {
      this.sportService.updateSport(this.currentSport).subscribe((sport) => {
        this.showSnackbar(`¡${sport.name} actualizado!`);
      });
      return;
    }

    this.sportService.addSport(this.currentSport).subscribe((sport) => {
      this.router.navigateByUrl('/');
      this.showSnackbar(`¡${sport.name} creado!`);
    });
  }

  onDelete() {
    if (!this.currentSport.id) throw Error('Id is required');

    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: this.sportForm.value,
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((result: boolean) => result),
        switchMap(() =>this.sportService.deleteSportById(this.currentSport.id)),
        filter((wasDeleted: boolean) => wasDeleted)
      )
      .subscribe(() => {
        this.router.navigateByUrl('/');
      });

      // Este es codigo previo a la optimizacion con los pipes
    // dialogRef.afterClosed().subscribe((result) => {
    //   if (!result) return;
    //   this.sportService
    //     .deleteSportById(this.currentSport.id)
    //     .subscribe((wasDelete) => {
    //       if (wasDelete) {
    //         this.router.navigateByUrl('/');
    //       }
    //     });
    // });
  }

  showSnackbar(msg: string): void {
    this.snackbar.open(msg, 'done', {
      duration: 3000,
    });
  }
}
