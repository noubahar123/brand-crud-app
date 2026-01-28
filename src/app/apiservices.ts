import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root',
})
export class Apiservices {

  ACCESS_TOKEN = "efPz790Rm0fJLOSWd0CK6fV4DYwsKN"
  COMPANY_ID = "b11b0815-26b2-444c-a176-d040909eb3cd"
  httpClient = inject(HttpClient)


  getBrands(): Observable<any> {
    return this.httpClient.get(`https://devapi.hyperinvento.com/v1/companies/${this.COMPANY_ID}/brands`)
  }

  postBrand(brandName: string) {
    return this.httpClient.post('https://devapi.hyperinvento.com/v1/companies/b11b0815-26b2-444c-a176-d040909eb3cd/brands', {
      name: brandName
    })
  }

  removeBrand(brandId: string) {
    return this.httpClient.post(`https://devapi.hyperinvento.com/v1/brands/${brandId}/delete`, {})
  }

  editBrand(brandId: string, updatedName: string) {
    return this.httpClient.patch(`https://devapi.hyperinvento.com/v1/brands/${brandId}`, { name: updatedName })
  }


}
