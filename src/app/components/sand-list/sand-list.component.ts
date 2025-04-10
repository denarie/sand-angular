import {Component, OnInit} from '@angular/core';
import { SandService } from '../../services/sand.service';
import { Sand } from '../../common/sand';
import {DecimalPipe, NgForOf, NgIf} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-sand-list',
  imports: [
    NgForOf,
    DecimalPipe,
    NgIf,
    RouterLink,
    MatPaginator,
    MatPaginatorModule
  ],
  templateUrl: './sand-list.component.html',
  styleUrl: './sand-list.component.css'
})
export class SandListComponent implements OnInit {
  sands: Sand[] | undefined;

  // properties for pagination
  thePageNumber: number = 0;
  thePageSize: number = 10;
  theTotalElements: number = 0;

  constructor(private sandService: SandService, private router: Router) { }

  ngOnInit() {
    this.listSands();
  }

  // Method is invoked once you "subscribe"
  listSands() {
    this.sandService.getSandListPaginate(this.thePageNumber,
      this.thePageSize).subscribe(this.processResult());
  }

  onPageChange(event: PageEvent): void {
    this.thePageNumber = event.pageIndex;
    this.thePageSize = event.pageSize;
    this.listSands();
  }

  doSearch(value: string) {
    this.thePageNumber = 0;
    this.thePageSize = 10;
    const searchValue = '%25' + value + '%25';
    this.sandService.searchSandsPaginate(searchValue, this.thePageNumber,
      this.thePageSize).subscribe(this.processResult());
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
