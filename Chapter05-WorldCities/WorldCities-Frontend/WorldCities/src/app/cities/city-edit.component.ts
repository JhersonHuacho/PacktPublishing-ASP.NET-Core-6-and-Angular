import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { City } from './city';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-city-edit',
  templateUrl: './city-edit.component.html',
  styleUrls: ['./city-edit.component.scss']
})
export class CityEditComponent implements OnInit {

  // the view title
  title?: string;

  // the form model
  form!: FormGroup;

  // the city object to edit
  city?: City;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(''),
      lat: new FormControl(''),
      lon: new FormControl('')
    });
    this.loadData();
  }

  loadData() {
    // retrieve the ID from the 'id' parameter
    let idParam = this.activatedRoute.snapshot.paramMap.get('id');
    let id = idParam ? +idParam : 0

    // fetch the city from the server
    const url = environment.baseUrl + 'api/Cities/' + id;
    this.httpClient.get<City>(url).subscribe(result => {
      this.city = result;
      this.title = "Edit - " + this.city.name;

      // update the form with the city value
      this.form.patchValue(this.city);
    }, error => console.error(error));
  }

  onSubmit() {
    let city = this.city;
    if (city) {
      city.name = this.form.controls['name'].value;
      city.lat = this.form.get('name')?.value;
      city.lon = this.form.controls['lon'].value;

      const url = environment.baseUrl + 'api/Cities' + city.id;

      this.httpClient.put<City>(url, city).subscribe(result => {
        console.log("City " + city!.id + " has been updated.");
        // go back to cities view
        this.router.navigate(['/cities']);
      }, error => console.error(error))
    }
  }

}
