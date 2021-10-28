import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SesionLoginComponent } from './pages/sesion/sesion-login/sesion-login.component';
import { ToolbarComponent } from './pages/shared/toolbar/toolbar.component';
import { SidebarComponent } from './pages/shared/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    SesionLoginComponent,
    ToolbarComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
