import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { SidebarComponent} from '../../shared/sidebar/sidebar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { SpinnerComponent } from '../../shared/interceptors/spinner/spinner.component';
import { HttpInterceptorProviders } from '../../shared/interceptors/interceptor.provider';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-plantilla-general',
  templateUrl: './plantilla-general.component.html',
  styleUrls: ['./plantilla-general.component.css'],
  standalone: true,
  imports:[   
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    SpinnerComponent,
    RouterModule],
    providers: [HttpInterceptorProviders]
})
export class PlantillaGeneralComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
