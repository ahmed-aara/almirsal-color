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

  // WhatsApp chat with the sales number, pre-filled with message. type tags the request in the link.
  whatsAppLink(message: string, type: string) {
    return `https://api.whatsapp.com/send/?phone=+2${this.phoneNumber}&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0&type_of_request=${type}`
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
