/* eslint-disable @typescript-eslint/no-explicit-any */
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

/**
 * See https://angular.io/guide/http#requesting-data-from-a-server
 */
export const httpOptions = {
  observe: 'body',
  responseType: 'json',
};

/**
 *
 *
 */
@Injectable()
export class ImageService {
  //endpoint = environment.apiUrl + 'api/card';
  endpoint = 'https://api.scryfall.com/cards/named?fuzzy=';

  constructor(private readonly http: HttpClient) {}

  public get(name: string): Observable<string> {
    console.log(`searching for an cardimage with the name: ${name}`);
    const reqname = name.replace(/\s/g, '');
    return this.http.get<any>(`${this.endpoint}${reqname}`).pipe(
      tap(console.log),
      map((response: any) => response.image_uris.art_crop)
    );
  }
}
