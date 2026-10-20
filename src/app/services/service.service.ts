import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  phoneNumber = '01033545417'

  url_product = '../../assets/json/product.json';
  url_project = '../../assets/json/project.json';

  constructor(private http: HttpClient) { }

  getProduct(): Observable<any> {
    return this.http.get(this.url_product);
  }

  getProject(): Observable<any> {
    return this.http.get(this.url_project);
  }

  getProductById(id: string): Observable<any> {
    return this.http.get<Array<any>>(this.url_product)
      .pipe(
        map((items: Array<any>) => {
          return items.find((item: any) => {
            return item.id === id;
          });
        })
      );
  }

}
