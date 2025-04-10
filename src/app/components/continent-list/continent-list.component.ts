import {Component, OnInit} from '@angular/core';
import {SandService} from '../../services/sand.service';
import {RouterLink} from '@angular/router';
import {Continent} from '../../common/continent';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-continent-list',
  imports: [
    NgForOf,
    RouterLink,
    NgForOf
  ],
  templateUrl: './continent-list.component.html',
  styleUrl: './continent-list.component.css'
})
export class ContinentListComponent implements OnInit {
  continents: Continent[] | undefined;

  constructor(private sandService: SandService) { }

  ngOnInit() {
    this.listContinent();
  }

  // Method is invoked once you "subscribe"
  listContinent() {
    this.sandService.getContinentList().subscribe(
        data => {
          this.continents = data;
        }
      );
  }

}
