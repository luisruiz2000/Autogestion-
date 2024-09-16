import { AfterViewInit, Component, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { SpinnerService } from './spinner.service';
import { CommonModule } from '@angular/common';
import { delay } from 'lodash';
import { HttpInterceptorProviders } from '../interceptor.provider';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-spinner',
  standalone: true,
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
  imports: [CommonModule,
    HttpClientModule],
  providers:[HttpInterceptorProviders],
 
})
export class SpinnerComponent implements AfterViewInit {
  loading = false;
  subscription!: Subscription;

  constructor(
    private loaderService: SpinnerService = inject(SpinnerService),
  ) { }

  ngAfterViewInit() {
    
    setTimeout(
      ()=>{
        console.log("ngAfterViewInit");
        this.loaderService.isLoading.subscribe(v => this.loading = v);
      }
    );

  }

}
