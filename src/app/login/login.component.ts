import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication.service';


interface Response {
  access_token : string;
}

@Component({
  selector: 'bs-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor (
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthenticationService

  ) {
    this.loginForm = this.fb.group({});
  }

  //initialisierung von Login
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      //formGroup im HTML
      username: ["", [Validators.required, Validators.email]], //required und muss email sein
      password: ["", Validators.required]
    });
  }

  //Login
  login() {
    //Werte von Login Formular werden in einen const val gespeichert
    const val = this.loginForm.value;
    //wenn Werte existieren
    if (val.username && val.password) {
      //login() von auth service bekommt username und passwort und schickt den an Server
      this.authService.login(val.username, val.password).subscribe((res:any) => {
        // speichert zurückgelieferten access token vom ergebnis in sessionStorage
        this.authService.setSessionStorage((res as Response).access_token);
        // router navigiert auf startseite und lädt fenster neu
        this.router.navigateByUrl("/").then(() => window.location.reload());
      });
    }
  }

  //schaut, ob User eingeloggt ist (token vorhanden und gültig)
  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

}
