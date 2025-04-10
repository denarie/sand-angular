import {Component, OnInit} from '@angular/core';
import {Person} from '../../common/person';
import {Sand} from '../../common/sand';
import {SandService} from '../../services/sand.service';
import {ActivatedRoute, ParamMap, RouterLink} from '@angular/router';
import {Country} from '../../common/country';
import {NgForOf} from '@angular/common';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MapMultiComponent} from '../map-multi/map-multi.component';

@Component({
  selector: 'app-country-details',
  imports: [
    NgForOf,
    RouterLink,
    MatPaginator,
    MapMultiComponent
  ],
  templateUrl: './country-details.component.html',
  styleUrl: './country-details.component.css'
})
export class CountryDetailsComponent implements OnInit {
  entityId: string | null | undefined;
  country: Country | undefined;
  sands: Sand[] | undefined;
  allSands: Sand[] = [];

  // properties for pagination
  thePageNumber: number = 0;
  thePageSize: number = 10;
  theTotalElements: number = 0;

  constructor(private sandService: SandService, private route: ActivatedRoute) { }

  ngOnInit() {
    // get the "id" param string. convert string to a number using the "+" symbol
    //     this.entityId = +this.route.snapshot.paramMap.get('id');
    this.entityId = this.route.snapshot.paramMap.get('id');

    // Or as an alternative, with slightly different execution...
    this.route.paramMap.subscribe((params: ParamMap) =>  {
      this.entityId = params.get('id');
    });

    this.getCountry(this.entityId);
    this.getSandsForCountryPaginated(this.entityId);
    this.getSandsForCountry(this.entityId);
  }

  // Method is invoked once you "subscribe"
  getCountry(theId: string | null) {
    this.sandService.getCountry(theId).subscribe(
      data => {
        this.country = data;
      }
    )
  }

  getSandsForCountry(theId: string | null | undefined) {
    this.sandService.getSandsForCountry(theId).subscribe(   data => {
        this.allSands = (data);
      }
    );
  }

  getSandsForCountryPaginated(theId: string | null | undefined) {
    this.sandService.getSandsForCountryPaginate(theId, this.thePageNumber,
      this.thePageSize).subscribe(this.processResult());
  }

  onPageChange(event: PageEvent): void {
    this.thePageNumber = event.pageIndex;
    this.thePageSize = event.pageSize;
    this.getSandsForCountryPaginated(this.entityId);
  }

  private processResult() {
    return (data: { _embedded: { sand: Sand[] | undefined; }; page: { number: number; size: number; totalElements: number; }; }) => {
      this.sands = data._embedded.sand;
      this.thePageNumber = data.page.number;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }
}
