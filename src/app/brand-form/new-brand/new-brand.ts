import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-brand',
  imports: [ReactiveFormsModule],
  templateUrl: './new-brand.html',
  styleUrl: './new-brand.css',
})
export class NewBrand {
  @Output() brandName = new EventEmitter<string>()

  brandVisible = signal(false)




  form = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    })


  })


  onSubmit() {
    const name = this.form.controls.name.value


    this.brandName.emit(name)
    this.brandVisible.update((value) => !value)
  }

  addBrand() {
    this.brandVisible.update((value) => !value)
  }

  onRemove() {
    this.brandVisible.update((value) => !value)
  }



}
