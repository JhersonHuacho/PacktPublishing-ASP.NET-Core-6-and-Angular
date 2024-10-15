import { Injectable } from '@angular/core';
import { ApiResult, BaseService } from '../base.service';
import { Country } from './country';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountryService extends BaseService<Country> {

  constructor(http: HttpClient) {
    super(http);
  }

  getData(
    pageIndex: number,
    pageSize: number,
    sortColumn: string,
    sortOrder: string,
    filterColumn: string | null,
    filterQuery: string | null): Observable<ApiResult<Country>> {
    let url = this.getUrl("api/Countries");
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

  get(id: number): Observable<Country> {
    let url = this.getUrl("api/Countries/" + id);
    return this.http.get<Country>(url);
  }

  put(item: Country): Observable<Country> {
    let url = this.getUrl("api/Countries/" + item.id);
    return this.http.put<Country>(url, item);
  }

  post(item: Country): Observable<Country> {
    let url = this.getUrl("api/Countries");
    return this.http.post<Country>(url, item);
  }

  isDupeField(countryId: number, fieldName: string, fieldValue: string): Observable<boolean> {
    let params = new HttpParams()
      .set("countryId", countryId)
      .set("fieldName", fieldName)
      .set("fieldValue", fieldValue);
    let url = this.getUrl("api/Countries/IsDupeField");

    return this.http.post<boolean>(url, null, { params });
  }
}
