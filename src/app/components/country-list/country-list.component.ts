import {Component, OnInit} from '@angular/core';
import {SandService} from '../../services/sand.service';
import {Router, RouterLink} from '@angular/router';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {Country} from '../../common/country';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-country-list',
  imports: [
    MatPaginator,
    NgForOf,
    NgIf,
    RouterLink
  ],
  templateUrl: './country-list.component.html',
  styleUrl: './country-list.component.css'
})
export class CountryListComponent implements OnInit {
  countries: Country[] | undefined;

  // properties for pagination
  thePageNumber: number = 0;
  thePageSize: number = 10;
  theTotalElements: number = 0;

  constructor(private sandService: SandService, private router: Router) { }

  ngOnInit() {
    this.listCountries();
  }

  // Method is invoked once you "subscribe"
  listCountries() {
    this.sandService.getCountryListPaginate(this.thePageNumber,
      this.thePageSize).subscribe(this.processResult());
  }

  onPageChange(event: PageEvent): void {
    this.thePageNumber = event.pageIndex;
    this.thePageSize = event.pageSize;
    this.listCountries();
  }

  doSearch(value: string) {
    this.thePageNumber = 0;
    this.thePageSize = 10;
    const searchValue = '%25' + value + '%25';
    this.sandService.searchCountriesPaginate(searchValue, this.thePageNumber,
      this.thePageSize).subscribe(this.processResult());
  }

  private processResult() {
    return (data: { _embedded: { country: Country[] | undefined; }; page: { number: number; size: number; totalElements: number; }; }) => {
      this.countries = data._embedded.country;
      this.thePageNumber = data.page.number;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }
}
