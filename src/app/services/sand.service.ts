import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Sand } from '../common/sand';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Person} from '../common/person';
import {Country} from '../common/country';
import {Continent} from '../common/continent';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SandService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private httpClient: HttpClient) { }

  getSandList(): Observable<Sand[]> {
    return this.httpClient.get<GetSandResponse>(this.baseUrl+'/sand').pipe(
      map(response => response._embedded.sand)
    );
  }

  getSandsForPerson(theId: string | null | undefined): Observable<Sand[]> {
    const url = `${this.baseUrl}/person/${theId}/sands`;
    return this.httpClient.get<GetSandResponse>(url).pipe(
      map(response => response._embedded.sand)
    );
  }

  getSandsForPersonPaginate(theId: string | null | undefined, thePage: number, thePageSize: number): Observable<GetSandResponse> {
    const url = `${this.baseUrl}/sand/search/findByPersonsId?personId=${theId}&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetSandResponse>(url);
  }

  getSandListPaginate(thePage: number, thePageSize: number): Observable<GetSandResponse> {
    const url = `${this.baseUrl}/sand?page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetSandResponse>(url);
  }

  searchSands(theKeyword: string): Observable<Sand[]> {
    const searchUrl = `${this.baseUrl}/sand/search/findByLongnameLikeIgnoreCase?name=${theKeyword}`;
    return this.httpClient.get<GetSandResponse>(searchUrl)
      .pipe(
        map(response => response._embedded.sand));
  }

  searchSandsPaginate(theKeyword: string, thePage: number, thePageSize: number): Observable<GetSandResponse> {
    const searchUrl = `${this.baseUrl}/sand/search/findByLongnameLikeIgnoreCase?name=${theKeyword}&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetSandResponse>(searchUrl);
  }

  getSand(theId: string | null): Observable<Sand> {
    const url = `${this.baseUrl}/sand/${theId}`;
    return this.httpClient.get<Sand>(url);
  }

  getPersonList(): Observable<Person[]> {
    return this.httpClient.get<GetPersonResponse>(this.baseUrl+'/person').pipe(
      map(response => response._embedded.person)
    );
  }

  getPersonsForSand(theId: string | null): Observable<Person[]> {
    const url = `${this.baseUrl}/sand/${theId}/persons`;
    return this.httpClient.get<GetPersonResponse>(url).pipe(
      map(response => response._embedded.person)
    );
  }

  getPersonListPaginate(thePage: number, thePageSize: number): Observable<GetPersonResponse> {
    const url = `${this.baseUrl}/person?page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetPersonResponse>(url);
  }

  searchPersonsPaginate(theKeyword: string, thePage: number, thePageSize: number): Observable<GetPersonResponse> {
    const searchUrl = `${this.baseUrl}/person/search/findByNameLikeIgnoreCase?name=${theKeyword}&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetPersonResponse>(searchUrl);
  }

  getPerson(theId: string | null): Observable<Person> {
    const url = `${this.baseUrl}/person/${theId}`;
    return this.httpClient.get<Person>(url);
  }

  getCountryListPaginate(thePage: number, thePageSize: number): Observable<GetCountryResponse> {
    const url = `${this.baseUrl}/country/search/findAllCountriesWithSands?page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetCountryResponse>(url);
  }

  searchCountriesPaginate(theKeyword: string, thePage: number, thePageSize: number): Observable<GetCountryResponse> {
    const searchUrl = `${this.baseUrl}/country/search/findByNameDeLikeIgnoreCase?name=${theKeyword}&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetCountryResponse>(searchUrl);
  }

  getCountry(theId: string | null): Observable<Country> {
    const url = `${this.baseUrl}/country/${theId}`;
    return this.httpClient.get<Country>(url);
  }

  getSandsForCountry(theId: string | null | undefined): Observable<Sand[]> {
    const url = `${this.baseUrl}/sand/search/findByCountryId?countryId=${theId}`;
    return this.httpClient.get<GetSandResponse>(url).pipe(
      map(response => response._embedded.sand)
    );
  }

  getSandsForCountryPaginate(theId: string | null | undefined, thePage: number, thePageSize: number): Observable<GetSandResponse> {
    const url = `${this.baseUrl}/sand/search/findByCountryId?countryId=${theId}&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetSandResponse>(url);
  }

  getContinentList(): Observable<Continent[]> {
    const url = `${this.baseUrl}/continent`;
    return this.httpClient.get<GetContinentResponse>(url).pipe(
      map(response => response._embedded.continent)
    );
  }

  getContinent(theId: string | null): Observable<Continent> {
    const url = `${this.baseUrl}/continent/${theId}`;
    return this.httpClient.get<Continent>(url);
  }

  getSandsForContinent(theId: string | null | undefined): Observable<Sand[]> {
    const url = `${this.baseUrl}/sand/search/findAllSandsByContinent?continentId=${theId}`;
    return this.httpClient.get<GetSandResponse>(url).pipe(
      map(response => response._embedded.sand)
    );
  }

  getSandsForContinentPaginate(theId: string | null | undefined, thePage: number, thePageSize: number): Observable<GetSandResponse> {
    const url = `${this.baseUrl}/sand/search/findAllSandsByContinentWithPagination?continentId=${theId}&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetSandResponse>(url);
  }

  getCountriesForContinentPaginate(theId: string | null | undefined, thePage: number, thePageSize: number): Observable<GetCountryResponse> {
    const url = `${this.baseUrl}/country/search/findByContinentIdWithPagination?continentId=${theId}&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetCountryResponse>(url);
  }
}

//   Unwraps the JSON from
//   Spring Data REST
//   _embedded entry
interface GetSandResponse {
  _embedded: {
    sand: Sand[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}
interface GetPersonResponse {
  _embedded: {
    person: Person[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}
interface GetCountryResponse {
  _embedded: {
    country: Country[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}
interface GetContinentResponse {
  _embedded: {
    continent: Continent[];
  }
}
