import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-brand',
  imports: [ReactiveFormsModule],
  templateUrl: './new-brand.html',
  styleUrl: './new-brand.css',
})
export class NewBrand {
  @Output() brandName = new EventEmitter()
  brandVisible = signal(false)




  form = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required]
    })


  })


  onSubmit() {
    this.brandName.emit(this.form.value)
    this.brandVisible.update((value) => !value)
  }

  addBrand() {
    this.brandVisible.update((value) => !value)
  }

  onRemove() {
    this.brandVisible.update((value) => !value)
  }



}
