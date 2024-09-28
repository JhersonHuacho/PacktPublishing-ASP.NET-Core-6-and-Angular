import { Component, OnInit } from '@angular/core';
import { City } from './city';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit {
  public displayedColumns: string[] = ['id', 'name', 'lat', 'lon'];
  public cities!: City[];

  constructor(private httpClient:HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get<City[]>(environment.baseUrl + 'api/cities')
      .subscribe(result => {
        this.cities = result;
      }, error => console.error(error));
  }

}
