import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { NewBrand } from "./new-brand/new-brand";
import { Apiservices } from '../apiservices';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of } from 'rxjs';
import { ɵInternalFormsSharedModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from "@angular/forms";
import { Brand } from '../brand.model';
import { ToastrService } from 'ngx-toastr';

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
export class BrandForm implements OnInit {
  myBrand = signal<string>('')
  apiServices = inject(Apiservices)
  allBrands = signal<Brand[]>([])
  screen = signal(false)
  loading = signal(false)
  buttonloading = signal(true)

  editErrorMessage = signal<string>('')
  fetchErrorMessage = signal<string>('')
  deleteErrorMessage = signal<string>('')
  addErrorMessage = signal<string>('')

  // Toaster 
  toastr = inject(ToastrService)
  formError = signal(false)





  form = new FormGroup({
    editedName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]

    })
  })
  selectedBrandId = signal<string | null>(null)


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

    effect(() => {
      console.log(" All brands are: ", this.allBrands())
    })

  }

  ngOnInit(): void {
    this.fetchAllbrands();
  }

  fetchAllbrands() {
    this.loading.set(true)

    this.apiServices.getBrands()
      .pipe(
        map(response => {
          this.loading.set(false)
          console.log(response)
          this.allBrands.set(response?.results)
          return response
        })
      ).subscribe({
        next: (next) => {
          this.toastr.success("Brands fetched successfully", "Success", {
            closeButton: true,
            timeOut: 2000
          })
        },
        error: (error) => {
          this.loading.set(false)
          // console.log("Error occured while fetching", error)
          // window.alert("Error occured while fetching")
          this.toastr.error("Error occured while Fetching", "Error", {
            closeButton: true
          })
        }
      })


  }







  getBrandName(value: string) {
    this.myBrand.set(value)
    this.apiServices.postBrand(this.myBrand()).subscribe({
      next: (value) => {
        this.fetchAllbrands()
        // console.log("New brand added")
        this.toastr.success("Brand successfully added", "Brand Added", {
          closeButton: true
        })
      },
      error: (error) => {
        this.loading.set(false)
        // window.alert("Error while posting listing")
        // console.log("Error occur while posting ", + error)
        this.toastr.error("An error Occured added while adding brand", "Failed", {
          closeButton: true
        })

      }
    })

  }

  onDeleteBrand(id: string) {
    this.apiServices.removeBrand(id).subscribe({
      next: (resp) => {
        // console.log(resp)
        this.fetchAllbrands()
        this.toastr.success("Brand deleted successful", "Brand Deleted", {
          closeButton: true,

        })

      },
      error: (err) => {
        this.loading.set(false)
        // window.alert("Error occured while deleting Brand")
        // console.log("Error occured while deleting Brand", err)
        this.toastr.error("Error while Deleting brand", "Failed To Delete", {
          closeButton: true
        })
      }
    })
  }

  onEditBrand(brand: Brand) {
    this.screen.update((value) => !value)
    this.form.controls.editedName.setValue(brand.name);
    this.selectedBrandId.set(brand.id)
    // console.log(this.selectedBrandId())

  }

  cancelEdit() {
    this.screen.update((value) => !value)

  }

  onSubmitEditedBrand() {
    const brandId = this.selectedBrandId()
    const editedName = this.form.value.editedName

    if (!brandId || !editedName) {
      // console.log("Missing BrandId or BrandName")
      // this.editErrorMessage.set("Add Missing Values")
      this.toastr.error("Missing Brand Values", "Add Value", {
        closeButton: true
      })
      return;
    }

    this.screen.update((value) => !value)
    console.log(this.form.value.editedName)
    this.apiServices.editBrand(brandId, editedName).subscribe({
      next: (resp) => {
        this.toastr.success("Brand updated successfully", "Brand Updated", {
          closeButton: true
        })
        this.fetchAllbrands()
        // console.log(resp)

      },
      error: (err) => {
        this.loading.set(false)
        // window.alert("Error while Editing Brand")
        // console.log(err)
        this.toastr.error("Failed while updating the brand", "Failed", {
          closeButton: true
        })
      }
    })
  }

}
