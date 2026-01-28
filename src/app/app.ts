import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BrandForm } from "./brand-form/brand-form";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BrandForm],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('brand-app');
}
