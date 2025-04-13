import {Component, Input, OnInit} from '@angular/core';
import {Sand} from '../../common/sand';
import {SandService} from '../../services/sand.service';
import {ActivatedRoute, ParamMap, RouterLink} from '@angular/router';
import {DecimalPipe, JsonPipe, KeyValuePipe, NgForOf, NgIf} from '@angular/common';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import {Person} from '../../common/person';
import {MapSingleComponent} from '../map-single/map-single.component';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-sand-details',
  imports: [
    DecimalPipe, NgForOf, RouterLink, MapSingleComponent
  ],
  templateUrl: './sand-details.component.html',
  styleUrl: './sand-details.component.css'
})
export class SandDetailsComponent implements OnInit {
  entityId: string | null | undefined;
  sand: Sand | undefined;
  persons: Person[] | undefined;

  constructor(private sandService: SandService, private route: ActivatedRoute,  private title: Title) { }

  ngOnInit() {
    // get the "id" param string. convert string to a number using the "+" symbol
    //     this.entityId = +this.route.snapshot.paramMap.get('id');
    this.entityId = this.route.snapshot.paramMap.get('id');

    // Or as an alternative, with slightly different execution...
    this.route.paramMap.subscribe((params: ParamMap) =>  {
      this.entityId = params.get('id');
    });

    this.getSand(this.entityId);
    this.getPersonsForSand(this.entityId);
  }

  // Method is invoked once you "subscribe"
  getSand(theId: string | null) {
    this.sandService.getSand(theId).subscribe(
      data => {
        this.sand = data;
        if (this.sand.name != null) {
          this.title.setTitle(this.sand.name);
        }
      }
    )
  }

  getPersonsForSand(theId: string | null) {
    this.sandService.getPersonsForSand(theId).subscribe(
      data => {
        this.persons = data;
      }
    )
  }
}
