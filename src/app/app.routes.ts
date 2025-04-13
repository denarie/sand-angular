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
  {path: 'sand', title: 'Sände' , component: SandListComponent},
  {path: 'sand/:id', title: 'Sand', component: SandDetailsComponent},
  {path: 'person', title: 'Personen', component: PersonListComponent},
  {path: 'person/:id', title: 'Person' ,component: PersonDetailsComponent},
  {path: 'country', title: 'Länder' ,component: CountryListComponent},
  {path: 'country/:id', title: 'Land' ,component: CountryDetailsComponent},
  {path: 'continent', title: 'Erdteile' ,component: ContinentListComponent},
  {path: 'continent/:id', title: 'Erdteil' ,component: ContinentDetailsComponent},
];
