import {Component, OnInit} from '@angular/core';
import {SandService} from '../../services/sand.service';
import {Person} from '../../common/person';
import {NgForOf, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {Sand} from '../../common/sand';

@Component({
  selector: 'app-person-list',
  imports: [
    NgForOf,
    NgIf,
    RouterLink,
    MatPaginator,
    MatPaginatorModule
  ],
  templateUrl: './person-list.component.html',
  styleUrl: './person-list.component.css'
})
export class PersonListComponent implements OnInit {
  persons: Person[] | undefined;

  // properties for pagination
  thePageNumber: number = 0;
  thePageSize: number = 10;
  theTotalElements: number = 0;

  constructor(private sandService: SandService) { }

  ngOnInit() {
    this.listPersons();
  }

  listPersons() {
    this.sandService.getPersonListPaginate(this.thePageNumber,
      this.thePageSize).subscribe(this.processResult());
  }

  onPageChange(event: PageEvent): void {
    this.thePageNumber = event.pageIndex;
    this.thePageSize = event.pageSize;
    this.listPersons();
  }

  doSearch(value: string) {
    this.thePageNumber = 0;
    this.thePageSize = 10;
    const searchValue = '%25' + value + '%25';
    this.sandService.searchPersonsPaginate(searchValue, this.thePageNumber,
      this.thePageSize).subscribe(this.processResult());
  }

  private processResult() {
    return (data: { _embedded: { person: Person[] | undefined; }; page: { number: number; size: number; totalElements: number; }; }) => {
      this.persons = data._embedded.person;
      this.thePageNumber = data.page.number;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }
}
