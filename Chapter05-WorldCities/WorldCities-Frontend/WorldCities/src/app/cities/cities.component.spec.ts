import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CitiesComponent } from './cities.component';
import { City } from './city';
import { CityService } from './city.service';
import { ApiResult } from '../base.service';


describe('CitiesComponent', () => {
  let component: CitiesComponent;
  let fixture: ComponentFixture<CitiesComponent>;

  beforeEach(async () => {
    // TODO: declare & initialize required providers
    // Create a mock cityService object with a mock 'getData' method
    let cityService = jasmine.createSpyObj<CityService>('CityService', ['getData']);
    // Configure the 'getData' spy method
    cityService.getData.and.returnValue(
      // return an Observable with some test data
      of<ApiResult<City>>(<ApiResult<City>>{
        data: [
          <City>{
            name: 'TestCity1',
            id: 1,
            lat: 1,
            lon: 1,
            countryId: 1,
            countryName: 'TestCountry1'
          },
          <City>{
            name: 'TestCity2',
            id: 2,
            lat: 2,
            lon: 2,
            countryId: 2,
            countryName: 'TestCountry2'
          },
          <City>{
            name: 'TestCity3',
            id: 3,
            lat: 3,
            lon: 3,
            countryId: 3,
            countryName: 'TestCountry3'
          }
        ],
        totalCount: 3,
        pageIndex: 0,
        pageSize: 10
      })
    );

    await TestBed.configureTestingModule({
      declarations: [CitiesComponent],
      imports: [BrowserAnimationsModule, AngularMaterialModule, RouterTestingModule],
      providers: [
        // TODO: reference required providers
        {
          provide: CityService,
          useValue: cityService
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitiesComponent);
    component = fixture.componentInstance;

    // TODO: configure fixture/component/children/etc.
    component.paginator = jasmine.createSpyObj(
      'MatPaginator', ['length', 'pageIndex', 'pageSize']);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: implement some other tests
  it('Should display a "Cities" title', () => {
    let title = fixture.nativeElement.querySelector('h1');
    expect(title.textContent).toEqual('Cities');
  });

  it('Should contain a table with a list of one or more cities', () => {
    let table = fixture.nativeElement.querySelector('table');
    expect(table).toBeTruthy();

    let rows = table.querySelectorAll('tr');
    expect(rows.length).toBeGreaterThan(0);
  });
});
