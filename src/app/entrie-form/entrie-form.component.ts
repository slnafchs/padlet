

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { User} from "../shared/padlet";
import {PadletFactory} from "../shared/padlet-factory";
import {PadletService} from "../shared/padlet.service";
import {ActivatedRoute, Router} from "@angular/router";
import {EntrieFormErrorMessages} from "../entrie-form/entrie-form-error-messages";
import {EntrieFactory} from "../shared/entrie-factory";
import {Entrie} from "../shared/entrie";

//Komponente
@Component({
  selector: 'bs-entrie-form',
  templateUrl: './entrie-form.component.html', //dazugehöriges HTML
  styles: [
  ]
})
//implements OnInit = ngOnInit()
export class EntrieFormComponent implements OnInit {
  title : string = "Eintrag erstellen"; //Property Binding @entrie-form-component.html
  entrieForm: FormGroup; //Gruppierung von Formelementen
  entrie: Entrie = EntrieFactory.empty();
  errors: { [key: string]: string } = {};
  padlet_id : number = 0;
  isUpdatingEntrie : boolean = false;

  constructor(
    private fb: FormBuilder,
    private bs: PadletService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.entrieForm = this.fb.group({});
  }

  //ist mit implements OnInit verbunden
  //Komponente wird initialisiert
  ngOnInit(): void {
    // id aus route parameter holen aus der app-routing.module.ts
    this.padlet_id = this.route.snapshot.params["padlet_id"];
    const id = this.route.snapshot.params["entrie_id"];
    // schauen, ob id vorhanden ist
    if (id) {
      // updating flag auf true setzen
      this.isUpdatingEntrie = true;
      // titel ändern auf bearbeiten statt erstellen
      this.title = "Eintrag bearbeiten";
      // mit service entrie mit dieser id holen
      this.bs.getSingleEntrie(id).subscribe(
        (res : Entrie) => {
          // lokaler entrie = ergebnis
          this.entrie = res;
          this.initEntrie();
        }
      );
    }
    this.initEntrie();
  }

  //Entrie Formular initialisieren
  initEntrie() : void {
    this.entrieForm = this.fb.group({
      // formControlName in HTML -> lokaler entrie
      id: this.entrie.id,
      title: [this.entrie.title, Validators.required],
      content: [this.entrie.content, Validators.required]
    });
    // validator check wenn sich Eingaben verändern
    this.entrieForm.statusChanges.subscribe(() =>
      this.updateErrorMessages());
  }

  //Error Messages
  updateErrorMessages() {
    this.errors = {};

    for (const message of EntrieFormErrorMessages) {
      const control = this.entrieForm.get(message.forControl);
      if (
        control &&
        control.dirty &&
        control.invalid && control.errors &&
        control.errors[message.forValidator] &&
        !this.errors[message.forControl]
      ) {
        this.errors[message.forControl] = message.text;
      }
    }
  }

  // Daten aus Form holen
  async submitForm() {
    // check ob Entrie aktualisiert oder neu erstellt wird
    if (this.isUpdatingEntrie) {
      //Values aus Entrie Form und in entrie speichern
      let entrie = EntrieFactory.fromObject(this.entrieForm.value);
      this.entrie.title = entrie.title; //lokaler entrie.name = neuer name aus form
      this.entrie.content = entrie.content; //lokaler entrie.content = neuer content aus form
      // Entrie mit padlet service im Backend updaten
      this.bs.updateEntrie(this.entrie).subscribe(res => {
        // zu Padlet mit geänderten Entrie zurück navigieren
        this.router.navigate(["padlets", this.padlet_id]);
      });
    } else { // Entrie wird neu erstellt
      //Values von Entrie Form wird in entrie gespeichert
      this.entrie = EntrieFactory.fromObject(this.entrieForm.value);
      // user_id aus sessionStorage holen
      let user_id : string = this.bs.getCurrentUserId();
      // eingeloggten user mit service aus Datenbank holen (warten auf ergebnis)
      let user = await this.getUser(+user_id);
      // user id in lokalem Entrie speichern
      this.entrie.user_id = +user_id;
      // user id in lokalem Entrie speichern
      this.entrie.user = user
      // user in lokalem Entrie speichern
      this.entrie.padlet_id = this.padlet_id; //leere padlet_id wird zu lokalen entrie.padlet_id
      this.entrie.comments = []; // comments sind bei neuem Entrie leer
      this.entrie.ratings = [];  // ratings sind bei neuem Entrie leer

      // neuen Entrie mit service erstellen
      this.bs.createEntrie(this.entrie, this.padlet_id.toString()).subscribe(res => {
        // lokales Entrie leeren (zurücksetzen)
        this.entrie = EntrieFactory.empty();
        // Entrie Form zurücksetzen
        this.entrieForm.reset(EntrieFactory.empty());
        //wieder zu Padlet navigieren
        this.router.navigate(["padlets", this.padlet_id]);
      });
    }
  }

  // user mit bestimmter id aus Datenbank holen
  async getUser(id: number) : Promise<User> {
    return new Promise((resolve, reject) => {
      // mit Service user mit id finden
      this.bs.getUserById(id).subscribe((res: User) => {
          // user zurückliefern
          resolve(res);
        },
        error => {
          reject("Error getting user.")
        });
    })
  }
}
