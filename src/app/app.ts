import { Component, signal } from '@angular/core';
import { BrandForm } from "./brand-form/brand-form";

@Component({
  selector: 'app-root',
  imports: [BrandForm],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('brand-app');
}
