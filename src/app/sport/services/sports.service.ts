import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { ISport } from '../interfaces/sports.interface';
import { environments } from '../../../environments/environments';

@Injectable({ providedIn: 'root' })
export class SportsService {
  constructor(private http: HttpClient) {}

  private baseUrl: string = environments.baseUrl;

  getSports(): Observable<ISport[]> {
    return this.http.get<ISport[]>(`${this.baseUrl}/sportsProducts`);
  }

  getSportById(id: string): Observable<ISport | undefined> {
    console.log(id);
    return this.http
      .get<ISport>(`${this.baseUrl}/sportsProducts/${id}`)
      .pipe(catchError((error) => of(undefined)));
  }

  getSuggestions(query: string): Observable<ISport[]> {
    return this.http.get<ISport[]>(
      `${this.baseUrl}/sportsProducts?q=${query}&_limit=6`
    );
  }

  addSport(sport: ISport): Observable<ISport> {
    return this.http.post<ISport>(`${this.baseUrl}/sportsProducts`, sport);
  }

  updateSport(sport: ISport): Observable<ISport> {
    if (!sport.id) throw Error('Id is required');
    return this.http.patch<ISport>(
      `${this.baseUrl}/sportsProducts/${sport.id}`,
      sport
    );
  }

  deleteSportById(id: string): Observable<boolean> {
    if (!id) throw Error('Id is required');
    return this.http
      .delete<ISport>(`${this.baseUrl}/sportsProducts/${id}`)
      .pipe(
        map((resp) => true),
        catchError((err) => of(false)),
      );
  }

}
