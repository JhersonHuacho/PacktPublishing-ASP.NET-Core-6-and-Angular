import { Injectable } from '@angular/core';
import { ApiResult, BaseService } from '../base.service';
import { City } from './city';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Country } from '../countries/country';

@Injectable({
  providedIn: 'root'
})
export class CityService extends BaseService<City> {

  constructor(http: HttpClient) {
    super(http);
  }

  getData(
    pageIndex: number,
    pageSize: number,
    sortColumn: string,
    sortOrder: string,
    filterColumn: string | null,
    filterQuery: string | null
  ): Observable<ApiResult<City>> {
    let url = this.getUrl('api/cities');
    //let params = this.getHttpParams(pageIndex, pageSize, sortColumn, sortOrder, filterColumn, filterQuery);
    let params = new HttpParams()
      .set("pageIndex", pageIndex.toString())
      .set("pageSize", pageSize.toString())
      .set("sortColumn", sortColumn)
      .set("sortOrder", sortOrder);

    if (filterColumn && filterQuery) {
      params = params
        .set("filterColumn", filterColumn)
        .set("filterQuery", filterQuery);
    }

    return this.http.get<ApiResult<City>>(url, { params });
  }

  get(id: number): Observable<City> {
    let url = this.getUrl('api/cities/' + id);
    return this.http.get<City>(url);
  }

  put(item: City): Observable<City> {
    let url = this.getUrl('api/cities/' + item.id);
    return this.http.put<City>(url, item);
  }

  post(item: City): Observable<City> {
    let url = this.getUrl('api/cities');
    return this.http.post<City>(url, item);
  }

  getCountries(
    pageIndex: number,
    pageSize: number,
    sortColumn: string,
    sortOrder: string,
    filterColumn: string | null,
    filterQuery: string | null
  ): Observable<ApiResult<Country>> {
    let url = this.getUrl('api/countries');
    let params = new HttpParams()
      .set("pageIndex", pageIndex.toString())
      .set("pageSize", pageSize.toString())
      .set("sortColumn", sortColumn)
      .set("sortOrder", sortOrder);

    if (filterColumn && filterQuery) {
      params = params
        .set("filterColumn", filterColumn)
        .set("filterQuery", filterQuery);
    }

    return this.http.get<ApiResult<Country>>(url, { params });
  }

  isDupeCity(city: City): Observable<boolean> {
    let url = this.getUrl('api/cities/IsDupeCity');
    return this.http.post<boolean>(url, city);
  }
}
