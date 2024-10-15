import { Component, OnInit, ViewChild } from '@angular/core';
import { City } from './city';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CityService } from './city.service';
@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit {
  public displayedColumns: string[] = ['id', 'name', 'lat', 'lon', 'countryName'];
  public cities!: MatTableDataSource<City>;

  defaultPageIndex: number = 0;
  defaultPageSize: number = 10;

  public defaultSortColumn: string = "name";
  public defaultSortOrder: "asc" | "desc" = "asc";

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  defaultFilterColumn: string = "name";
  filterQuery?: string;

  filterTextChanged: Subject<string> = new Subject<string>();

  constructor(private cityService:CityService) { }

  ngOnInit(): void {
    this.loadData(undefined);
  }

  // debounce filter text changes
  onFilterTextChanged(filterText: string) {
    if (this.filterTextChanged.observers.length == 0) {
      this.filterTextChanged.pipe(debounceTime(1000), distinctUntilChanged())
        .subscribe(query => {
          this.loadData(query);
        });
    }
    this.filterTextChanged.next(filterText);
  }

  loadData(query?: string) {
    let pageEvent = new PageEvent();
    pageEvent.pageIndex = this.defaultPageIndex;
    pageEvent.pageSize = this.defaultPageSize;
    this.filterQuery = query;
    this.getData(pageEvent);
  }

  getData(event: PageEvent) {
    let sortColumn = (this.sort) ? this.sort.active : this.defaultSortColumn;
    let sortOrder = (this.sort) ? this.sort.direction : this.defaultSortOrder;
    let filterColumn = (this.filterQuery) ? this.defaultFilterColumn : null;
    let filterQuery = (this.filterQuery) ? this.filterQuery : null;

    this.cityService.getData(
      event.pageIndex,
      event.pageSize,
      sortColumn,
      sortOrder,
      filterColumn,
      filterQuery)
      .subscribe(result => {
        this.paginator.length = result.totalCount;
        this.paginator.pageIndex = result.pageIndex;
        this.paginator.pageSize = result.pageSize;
        this.cities = new MatTableDataSource<City>(result.data);
      }, error => console.error(error));

    // let url = environment.baseUrl + 'api/cities';
    // let params = new HttpParams()
    //   .set("pageIndex", event.pageIndex.toString())
    //   .set("pageSize", event.pageSize.toString())
    //   .set("sortColumn", (this.sort) ? this.sort.active : this.defaultSortColumn)
    //   .set("sortOrder", (this.sort) ? this.sort.direction : this.defaultSortOrder);

    // if (this.filterQuery) {
    //   params = params
    //     .set("filterColumn", this.defaultFilterColumn)
    //     .set("filterQuery", this.filterQuery);
    // }

    // this.httpClient.get<any>(url, { params })
    //   .subscribe(result => {
    //     this.paginator.length = result.totalCount;
    //     this.paginator.pageIndex = result.pageIndex;
    //     this.paginator.pageSize = result.pageSize;
    //     this.cities = new MatTableDataSource<City>(result.data);
    //   }, error => console.error(error));
  }
}
