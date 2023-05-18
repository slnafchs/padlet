import {Component} from '@angular/core';
import {Padlet} from "./shared/padlet";
import {HttpClient} from "@angular/common/http";
import {map} from 'rxjs/operators';

@Component({
  selector: 'bs-root',
  templateUrl: './app.component.html'
})

export class AppComponent {
  //title = 'padletAngularApp';
  //listOn = true;
  //detailsOn = false;
  padlet: Padlet | undefined;

  constructor(private http: HttpClient) {
    http.get<Padlet>('https://padlet.s2010456006.student.kwmhgb.at/padlets').subscribe(val => this.padlet = val);
  }
}
