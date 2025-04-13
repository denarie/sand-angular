import {Component, OnInit} from '@angular/core';
import {Sand} from '../../common/sand';
import {SandService} from '../../services/sand.service';
import {ActivatedRoute, ParamMap, RouterLink} from '@angular/router';
import {Continent} from '../../common/continent';
import {NgForOf} from '@angular/common';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MapMultiComponent} from '../map-multi/map-multi.component';
import {Country} from '../../common/country';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-continent-details',
  imports: [
    NgForOf,
    RouterLink,
    MatPaginator,
    MapMultiComponent
  ],
  templateUrl: './continent-details.component.html',
  styleUrl: './continent-details.component.css'
})
export class ContinentDetailsComponent  implements OnInit {
  entityId: string | null | undefined;
  continent: Continent | undefined;
  sands: Sand[] | undefined;
  allSands: Sand[] = [];
  countries: Country[] | undefined;

  // properties for pagination
  thePageNumber: number = 0;
  thePageSize: number = 10;
  theTotalElements: number = 0;

  thePageNumberCountries: number = 0;
  thePageSizeCountries: number = 10;
  theTotalElementsCountries: number = 0;


  constructor(private sandService: SandService, private route: ActivatedRoute, private title: Title) { }

  ngOnInit() {
    // get the "id" param string. convert string to a number using the "+" symbol
    //     this.entityId = +this.route.snapshot.paramMap.get('id');
    this.entityId = this.route.snapshot.paramMap.get('id');

    // Or as an alternative, with slightly different execution...
    this.route.paramMap.subscribe((params: ParamMap) =>  {
      this.entityId = params.get('id');
    });

    this.getContinent(this.entityId);
    this.getSandsForContinentPaginate(this.entityId);
    this.getSandsForContinent(this.entityId);
    this.getCountriesForContinentPaginate(this.entityId);
  }

  // Method is invoked once you "subscribe"
  getContinent(theId: string | null) {
    this.sandService.getContinent(theId).subscribe(
      data => {
        this.continent = data;
        if (this.continent.name != null) {
          this.title.setTitle(this.continent.name);
        }
      }
    )
  }

  getSandsForContinent(theId: string | null | undefined) {
    this.sandService.getSandsForContinent(theId).subscribe(   data => {
        this.allSands = (data);
      }
    );
  }

  getSandsForContinentPaginate(theId: string | null | undefined) {
    this.sandService.getSandsForContinentPaginate(theId, this.thePageNumber,
      this.thePageSize).subscribe(this.processResult());
  }

  getCountriesForContinentPaginate(theId: string | null | undefined) {
    this.sandService.getCountriesForContinentPaginate(theId, this.thePageNumberCountries,
      this.thePageSizeCountries).subscribe(this.processResultCountries());
  }

  onPageChange(event: PageEvent): void {
    this.thePageNumber = event.pageIndex;
    this.thePageSize = event.pageSize;
    this.getSandsForContinentPaginate(this.entityId);
  }

  onPageChangeCountries(event: PageEvent): void {
    this.thePageNumberCountries = event.pageIndex;
    this.thePageSizeCountries = event.pageSize;
    this.getCountriesForContinentPaginate(this.entityId);
  }

  private processResult() {
    return (data: { _embedded: { sand: Sand[] | undefined; }; page: { number: number; size: number; totalElements: number; }; }) => {
      this.sands = data._embedded.sand;
      this.thePageNumber = data.page.number;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }

  private processResultCountries() {
    return (data: { _embedded: { country: Country[] | undefined; }; page: { number: number; size: number; totalElements: number; }; }) => {
      this.countries = data._embedded.country;
      this.thePageNumberCountries = data.page.number;
      this.thePageSizeCountries = data.page.size;
      this.theTotalElementsCountries = data.page.totalElements;
    };
  }
}
