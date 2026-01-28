import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { NewBrand } from "./new-brand/new-brand";
import { Apiservices } from '../apiservices';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of } from 'rxjs';
import { ɵInternalFormsSharedModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from "@angular/forms";

// const INITIAL_RESPONSE: BrandResponse = {
//   count: 0,
//   next: null,
//   previous: null,
//   results: []
// }

@Component({
  selector: 'app-brand-form',
  standalone: true,
  imports: [NewBrand, ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './brand-form.html',
  styleUrl: './brand-form.css',
})
export class BrandForm {
  myBrand = signal('')
  apiServices = inject(Apiservices)
  allBrands = signal<any[]>([])
  screen = signal(false)

  form = new FormGroup({
    editedName: new FormControl('', {
      validators: [Validators.required]
    })
  })


  // myBrand = signal('')
  // apiServices = inject(Apiservices)
  // allBrands = toSignal(
  //   this.apiServices.getBrands().pipe(
  //     catchError(err => {
  //       console.log('API Error', err)
  //       return of(Brand)
  //     })
  //   ),
  //   {
  //     initialValue: Brand
  //   }
  // );

  // finalBrands = computed(() => this.allBrands().results)

  constructor() {

    this.apiServices.getBrands()
      .pipe(
        map(response => {
          this.allBrands.set(response?.results)
          return response
        })
      ).subscribe()

    effect(() => {
      console.log("brands", this.allBrands())
    })

  }





  getBrandName(value: { name: string }) {
    this.myBrand.set(value.name)
    this.apiServices.postBrand(this.myBrand()).subscribe()
  }

  onDeleteBrand(id: string) {
    this.apiServices.removeBrand(id).subscribe({
      next: (resp) => {
        console.log(resp)

      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  onEditBrand(id: string) {
    this.screen.update((value) => !value)
    this.apiServices.editBrand(id, "Nerula").subscribe({
      next: (resp) => {
        console.log(resp)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  onSubmit() {
    this.screen.update((value) => !value)
  }

}
