import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataTransportService {
  constructor() {}

  private data$ = new BehaviorSubject<number>(0);
  selectedProduct$ = this.data$.asObservable();

  private product$ = new BehaviorSubject<any>(0);
  selectedProduct2$ = this.product$.asObservable();

  getData() {
    return this.data$;
  }

  setData(data: any) {
    this.data$.next(data);
  }

  getProduct() {
    return this.product$;
  }

  setProduct(data: any) {
    this.product$.next(data);
  }
}
