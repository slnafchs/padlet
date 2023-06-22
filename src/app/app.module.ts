import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { PadletListComponent } from './padlet-list/padlet-list.component';
import { PadletListItemComponent } from './padlet-list-item/padlet-list-item.component';
import { PadletDetailsComponent } from './padlet-details/padlet-details.component';
import { EntrieItemComponent } from './entrie-item/entrie-item.component';
import {PadletService} from "./shared/padlet.service";
import {AppRoutingModule} from "./app-routing.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import { PadletFormComponent } from './padlet-form/padlet-form.component';
import { LoginComponent } from './login/login.component';
import {AuthenticationService} from "./shared/authentication.service";
import { MypadletListComponent } from './mypadlet-list/mypadlet-list.component';
import { PrivatepadletListComponent } from './privatepadlet-list/privatepadlet-list.component';
import { EntrieFormComponent } from './entrie-form/entrie-form.component';
import {JwtInterceptorService} from "./shared/jwt-interceptor.service";
import {TokenInterceptorService} from "./shared/token-interceptor.service";
import { MyinvitesListComponent } from './myinvites-list/myinvites-list.component';
import { InviteItemComponent } from './invite-item/invite-item.component';
import { UserrightsListComponent } from './userrights-list/userrights-list.component';
import { UserrightItemComponent } from './userright-item/userright-item.component';


// Deklaration der Komponenten
@NgModule({
  declarations: [
    AppComponent,
    PadletListComponent,
    PadletListItemComponent,
    PadletDetailsComponent,
    EntrieItemComponent,
    PadletFormComponent,
    LoginComponent,
    MypadletListComponent,
    PrivatepadletListComponent,
    EntrieFormComponent,
    MyinvitesListComponent,
    InviteItemComponent,
    UserrightsListComponent,
    UserrightItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],

  // HTTP Interceptors im providers Block registrieren
  providers: [PadletService, AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
