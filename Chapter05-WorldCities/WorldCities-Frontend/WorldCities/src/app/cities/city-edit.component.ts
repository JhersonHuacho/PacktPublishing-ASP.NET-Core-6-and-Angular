import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, Validators } from '@angular/forms';
import { City } from './city';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Country } from '../countries/country';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseFormComponent } from '../base-form.component';

@Component({
  selector: 'app-city-edit',
  templateUrl: './city-edit.component.html',
  styleUrls: ['./city-edit.component.scss']
})
export class CityEditComponent extends BaseFormComponent implements OnInit {

  // the view title
  title?: string;

  // the form model
  //form!: FormGroup;

  // the city object to edit or create
  city?: City;

  // the city object id, as fetched from the active route:
  // It's NULL when we're adding a new city,
  // and not NULL when we're editing an existing one.
  id?: number;

  // the countries array for the select
  countries: Country[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient
  ) {
    super();
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      lat: new FormControl('', [Validators.required, Validators.pattern(/^[-]?[0-9]+(\.[0-9]{1,4})?$/)]),
      lon: new FormControl('', [Validators.required, Validators.pattern(/^[-]?[0-9]+(\.[0-9]{1,4})?$/)]),
      countryId: new FormControl('', Validators.required)
    }, null, this.isDupeCity());
    this.loadData();
  }

  loadData() {
    // load countries
    this.loadCountries();

    // retrieve the ID from the 'id' parameter
    let idParam = this.activatedRoute.snapshot.paramMap.get('id');
    this.id = idParam ? +idParam : 0

    if (this.id) {
      // EDIT MODE

      // fetch the city from the server
      const url = environment.baseUrl + 'api/Cities/' + this.id;
      this.httpClient.get<City>(url).subscribe(result => {
        this.city = result;
        this.title = "Edit - " + this.city.name;

        // update the form with the city value
        this.form.patchValue(this.city);
      }, error => console.error(error));
    } else {
      // ADD NEW MODE
      this.title = "Create a new City";
    }


  }

  loadCountries() {
    // fetch all countries from the server
    let url = environment.baseUrl + 'api/Countries';
    let params = new HttpParams()
      .set("pageIndex", "0")
      .set("pageSize", "9999")
      .set("sortColumn", "name");

    this.httpClient.get<any>(url, { params }).subscribe(result => {
      this.countries = result.data;
    }, error => console.log(error));
  }

  isDupeCity(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{[key: string]: any} | null> => {
      let city = <City>{};
      city.id = (this.id) ? this.id : 0;
      city.name = this.form.controls['name'].value;
      city.lat = this.form.get('lat')?.value;
      city.lon = this.form.controls['lon'].value;
      city.countryId = +this.form.controls['countryId'].value;

      const url = environment.baseUrl + 'api/Cities/IsDupeCity'

      return this.httpClient.post<boolean>(url, city)
        .pipe(
          map(result => {
            return (result ? { isDupeCity: true } : null);
          })
        );
    }
  }

  onSubmit() {
    console.log(this.form.controls['name']);

    let city = (this.id) ? this.city : <City>{};
    if (city) {
      city.name = this.form.controls['name'].value;
      city.lat = this.form.get('lat')?.value;
      city.lon = this.form.controls['lon'].value;
      city.countryId = this.form.controls['countryId'].value;

      if (this.id) {
        // EDIT MODE
        const url = environment.baseUrl + 'api/Cities' + city.id;

        this.httpClient.put<City>(url, city).subscribe(result => {
          console.log("City " + city!.id + " has been updated.");
          // go back to cities view
          this.router.navigate(['/cities']);
        }, error => console.error(error))
      } else {
        // ADD NEW MODE
        let url = environment.baseUrl + 'api/Cities';
        this.httpClient.post<City>(url, city).subscribe(result => {
          console.log("City " + result.id + " has been created.");

          // go back to cities view
          this.router.navigate(['/cities']);
        }, error => console.error(error));
      }
    }
  }

}
