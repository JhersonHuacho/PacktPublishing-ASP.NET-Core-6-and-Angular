import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Country } from './country';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-country-edit',
  templateUrl: './country-edit.component.html',
  styleUrls: ['./country-edit.component.scss']
})
export class CountryEditComponent implements OnInit {

  // the view title
  title?: string;

  // the form model
  form!: FormGroup;

  // the country object to edit or create
  country?: Country;

  // the country object id, as fetched from the active route:
  // It's NULL when we're adding a new country,
  // and not NULL when we're editing an existing one.
  id?: number;

  // the countries array for the select
  countries?: Country[];

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required, this.idDupeField('name')],
      iso2: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{2}$/)], this.idDupeField('iso2')],
      iso3: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{3}$/)], this.idDupeField('iso3')]
    });
    this.loadData();
  }

  loadData() {
    // retrieve the ID from the 'id' parameter
    var idParam = this.activatedRoute.snapshot.paramMap.get('id');
    this.id = idParam ? +idParam : 0;
    if (this.id) {
      // EDIT MODE

      // fetch the country from the server
      var url = environment.baseUrl + "api/Countries/" + this.id;

      this.httpClient.get<Country>(url).subscribe(result => {
        this.country = result;
        this.title = "Edit - " + this.country.name;
        // update the form with the country value
        this.form.patchValue(this.country);
      }, error => console.error(error));
    }
    else {
      // ADD NEW MODE
      this.title = "Create a new Country";
    }
  }

  idDupeField(filedName: string): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      let params = new HttpParams()
        .set("countryId", this.id?.toString() || "0")
        .set("fieldName", filedName)
        .set("fieldValue", control.value);

      const url = environment.baseUrl + 'api/countries/IsDupeField';
      return this.httpClient.post<boolean>(url, null, { params })
        .pipe(
          map(result => {
            return (result ? { isDupeField: true } : null);
          })
        );
    }
  }

  onSubmit() {
    console.log(this.form.controls['name']);
    console.log(this.form.controls['iso2']);
    console.log(this.form.controls['iso3']);
    let country = (this.id) ? this.country : <Country>{};
    if (country) {
      country.name = this.form.controls['name'].value;
      country.iso2 = this.form.controls['iso2'].value;
      country.iso3 = this.form.controls['iso3'].value;

      if (this.id) {
        // EDIT mode
        const url = environment.baseUrl + 'api/Countries/' + country.id;
        this.httpClient.put<Country>(url, country)
          .subscribe(result => {
            console.log('Country ' + country?.id + ' has been updated.');
            // go back to countries view
            this.router.navigate(['/countries']);
          }, error => console.error(error));
      } else {
        // ADD NEW mode
        const url = environment.baseUrl + 'api/Countries';
        this.httpClient.post<Country>(url, country)
          .subscribe(result => {
            console.log('Country ' + result.id + ' has been created.');
            // go back to countries view
            this.router.navigate(['/countries']);
          }, error => console.error(error));
      }
    }
  }
}
