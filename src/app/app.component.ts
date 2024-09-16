import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet,RouterLink } from '@angular/router';
import { FooterComponent } from './shared/footer/footer.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,RouterLink],
 
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
 
    
})
export class AppComponent {
  title = 'AutoGestionFrontRefactor';
}
