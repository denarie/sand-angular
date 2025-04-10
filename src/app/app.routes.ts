import { Routes } from '@angular/router';
import {SandListComponent} from './components/sand-list/sand-list.component';
import {SandDetailsComponent} from './components/sand-details/sand-details.component';
import {PersonListComponent} from './components/person-list/person-list.component';
import {PersonDetailsComponent} from './components/person-details/person-details.component';
import {CountryListComponent} from './components/country-list/country-list.component';
import {CountryDetailsComponent} from './components/country-details/country-details.component';
import {ContinentDetailsComponent} from './components/continent-details/continent-details.component';
import {ContinentListComponent} from './components/continent-list/continent-list.component';
import {MapSingleComponent} from './components/map-single/map-single.component';

export const routes: Routes = [
  {path: 'sand', component: SandListComponent},
  {path: 'sand/:id', component: SandDetailsComponent},
  {path: 'person', component: PersonListComponent},
  {path: 'person/:id', component: PersonDetailsComponent},
  {path: 'country', component: CountryListComponent},
  {path: 'country/:id', component: CountryDetailsComponent},
  {path: 'continent', component: ContinentListComponent},
  {path: 'continent/:id', component: ContinentDetailsComponent},
];
