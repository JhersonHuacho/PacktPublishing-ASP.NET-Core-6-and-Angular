import { Component, OnInit, ViewChild } from '@angular/core';
import { City } from './city';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit {
  public displayedColumns: string[] = ['id', 'name', 'lat', 'lon'];
  public cities!: MatTableDataSource<City>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private httpClient:HttpClient) { }

  ngOnInit(): void {
    let pageEvent = new PageEvent();
    pageEvent.pageIndex = 0;
    pageEvent.pageSize = 10;
    // this.getDataAnterior();
    this.getData(pageEvent);
  }

  getData(event: PageEvent) {
    let url = environment.baseUrl + 'api/cities';
    let params = new HttpParams()
      .set("pageIndex", event.pageIndex.toString())
      .set("pageSize", event.pageSize.toString());

    this.httpClient.get<any>(url, { params })
      .subscribe(result => {
        this.paginator.length = result.totalCount;
        this.paginator.pageIndex = result.pageIndex;
        this.paginator.pageSize = result.pageSize;
        this.cities = new MatTableDataSource<City>(result.data);
      }, error => console.error(error));
  }

  getDataAnterior(){
    this.httpClient.get<City[]>(environment.baseUrl + 'api/cities')
      .subscribe(result => {
        // this.cities = result;
        this.cities = new MatTableDataSource<City>(result);
        this.cities.paginator = this.paginator;
      }, error => console.error(error));
  }

}
