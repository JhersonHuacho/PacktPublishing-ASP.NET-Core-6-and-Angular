import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CitiesComponent } from './cities/cities.component';
import { CountriesComponent } from './countries/countries.component';
import { CityEditComponent } from './cities/city-edit.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'cities',
    component: CitiesComponent
  },
  {
    path: 'countries',
    component: CountriesComponent
  },
  {
    path: 'city-edit/:id',
    component: CityEditComponent
  },
  {
    path: 'city-add',
    component: CityEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
