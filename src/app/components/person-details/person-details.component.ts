import {Component, OnInit} from '@angular/core';
import {SandService} from '../../services/sand.service';
import {ActivatedRoute, ParamMap, RouterLink} from '@angular/router';
import {Person} from '../../common/person';
import {Sand} from '../../common/sand';
import {NgForOf} from '@angular/common';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MapMultiComponent} from '../map-multi/map-multi.component';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-person-details',
  imports: [
    NgForOf,
    RouterLink,
    MatPaginator,
    MapMultiComponent
  ],
  templateUrl: './person-details.component.html',
  styleUrl: './person-details.component.css'
})
export class PersonDetailsComponent  implements OnInit {
  entityId: string | null | undefined;
  person: Person | undefined;
  sands: Sand[] | undefined;
  allSands: Sand[] = [];

  // properties for pagination
  thePageNumber: number = 0;
  thePageSize: number = 10;
  theTotalElements: number = 0;

  constructor(private sandService: SandService, private route: ActivatedRoute, private title: Title) { }

  ngOnInit() {
    // get the "id" param string. convert string to a number using the "+" symbol
    //     this.entityId = +this.route.snapshot.paramMap.get('id');
    this.entityId = this.route.snapshot.paramMap.get('id');

    // Or as an alternative, with slightly different execution...
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.entityId = params.get('id');
    });

    this.getPerson(this.entityId);
    this.getSandsForPersonPaginated(this.entityId);
    this.getSandsForPerson(this.entityId);
  }

  onPageChange(event: PageEvent): void {
    this.thePageNumber = event.pageIndex;
    this.thePageSize = event.pageSize;
    this.getSandsForPersonPaginated(this.entityId);
  }

  // Method is invoked once you "subscribe"
  getPerson(theId: string | null) {
    this.sandService.getPerson(theId).subscribe(
      data => {
        this.person = data;
        if (this.person.name != null) {
          this.title.setTitle(this.person.name);
        }
      }
    )
  }

  getSandsForPersonPaginated(theId: string | null | undefined) {
    this.sandService.getSandsForPersonPaginate(theId, this.thePageNumber,
      this.thePageSize).subscribe(this.processResult());
  }

  getSandsForPerson(theId: string | null | undefined) {
    this.sandService.getSandsForPerson(theId).subscribe(   data => {
        this.allSands = (data);
      }
    );
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
