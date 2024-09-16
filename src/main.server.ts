import { bootstrapApplication } from '@angular/platform-browser';
import { LoginComponent } from './app/components/auth/login/login.component';
import { config } from './app/app.config.server';
import { AppComponent } from './app/app.component';

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
