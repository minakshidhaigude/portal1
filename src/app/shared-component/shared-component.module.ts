import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedComponentRoutingModule } from './shared-component-routing.module';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/layout/header/header.component';
import { LandingComponent } from './components/layout/landing/landing.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { httpInterceptors } from '../core/interceptors';

@NgModule({
  declarations: [
    HeaderComponent,
    LandingComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedComponentRoutingModule,
  ],
  providers: [AuthService, httpInterceptors],
  exports: [HeaderComponent, LandingComponent, FooterComponent],
})
export class SharedComponentModule {}
