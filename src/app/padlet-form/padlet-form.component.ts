import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Padlet, User} from "../shared/padlet";
import {PadletFactory} from "../shared/padlet-factory";
import {PadletService} from "../shared/padlet.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PadletFormErrorMessages} from "./padlet-form-error-messages";
import {UserFactory} from "../shared/user-factory";
import {Userright} from "../shared/userright";

@Component({
  selector: 'bs-padlet-form',
  templateUrl: './padlet-form.component.html',
  styles: [
  ]
})
export class PadletFormComponent implements OnInit{

  title : string = "Padlet erstellen";
  padletForm: FormGroup;
  padlet: Padlet = PadletFactory.empty();
  errors: { [key: string]: string } = {};

  isUpdatingPadlet : boolean = false;
  isPublic: boolean = true;


  constructor(
    private fb: FormBuilder,
    private bs: PadletService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.padletForm = this.fb.group({});
  }

  //initialisieren
  ngOnInit(): void {
    // id aus route parameter holen
    const id = this.route.snapshot.params["id"];
    // schauen, ob id vorhanden ist
    if (id) {
      // updating flag auf true setzen
      this.isUpdatingPadlet = true;
      // titel ändern auf bearbeiten statt erstellen
      this.title = "Padlet bearbeiten";
      // mit service padlet mit dieser id holen
      this.bs.getSinglePadlet(id).subscribe(
        (res : Padlet) => {
          // lokales padlet = ergebnis
          this.padlet = res;
          this.initPadlet();
        }
      );
    }
    this.initPadlet();
  }

  // padletForm initialisieren
  initPadlet() : void {
    this.padletForm = this.fb.group({
      // formControlName in HTML -> lokales padlet
      id: this.padlet.id,
      name: [this.padlet.name, Validators.required],
      is_public: this.padlet.is_public,
    });
    // validator check wenn sich Eingaben verändern
    this.padletForm.statusChanges.subscribe(() =>
      this.updateErrorMessages());
  }

  updateErrorMessages() {
    console.log("Is form invalid? " + this.padletForm.invalid);
    this.errors = {};

    for (const message of PadletFormErrorMessages) {
      const control = this.padletForm.get(message.forControl);
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
    // check ob Padlet aktualisiert oder neu erstellt wird
    if (this.isUpdatingPadlet) { // Padlet wird geupdated
      // temporäres Padlet erstellen und name und is_public aus Form holen
      // damit lokales Padlet nicht überschrieben wird
      let padlet = PadletFactory.fromObject(this.padletForm.value);
      this.padlet.name = padlet.name; // lokales padlet.name = neuer name aus form
      this.padlet.is_public = padlet.is_public; // lokales padlet.is_public = neues is_public aus form
      // Padlet mit service im Backend updaten
      this.bs.updatePadlet(this.padlet).subscribe(() => {
        // zum geänderten Padlet zurück navigieren
        this.router.navigate(["padlets", this.padlet.id]);
      });
    } else { // Padlet wird neu erstellt

      // neues Padlet mit Werten aus Form erstellen (lokales padlet = aus form)
      this.padlet = PadletFactory.fromObject(this.padletForm.value);
      this.padlet.is_public = this.isPublic; // public in lokalem Padlet speichern (zur sicherheit)
      // user_id aus sessionStorage holen
      let user_id : string = this.bs.getCurrentUserId();
      // eingeloggten user mit service aus Datenbank holen (warten auf ergebnis)
      let user = await this.getUser(+user_id);
      // user id in lokalem Padlet speichern
      this.padlet.user_id = +user_id;
      // user in lokalem padlet speichern
      this.padlet.user = user;
      // entries sind bei neuem Padlet leer
      this.padlet.entries = [];

      // neues Padlet mit service erstellen
      this.bs.createPadlet(this.padlet).subscribe((res: Padlet) => {
        // lokales Padlet leeren (zurücksetzen)
        this.padlet = PadletFactory.empty();
        // padletForm zurücksetzen
        this.padletForm.reset(PadletFactory.empty());

        // Ersteller des Padlets ist Owner -> bekommt alle Rechte auf Padlet
        let userright = new Userright(+user_id, res.id, true, true, true);
        // neues userright mit service in Datenbank erstellen und danach zur Startseite navigieren
        this.bs.createUserright(userright).subscribe(res => this.router.navigate(["public"]));
      });
    }
  }

  // user mit bestimmter id aus Datenbank holen
  async getUser(id: number) : Promise<User> {
    return new Promise((resolve, reject) => {
      // mit Service user mit id finden
      let response = this.bs.getUserById(id).subscribe((res: User) => {
          // user zurückliefern
          resolve(res);
        },
        error => {
          reject("Error getting user.")
        });
    })
  }

  // toggle wird von checkbox aufgerufen
  toggleIsPublic(event : any) {
    // checkbox in form verändert Wert von lokalem isPublic
    this.isPublic = event.target.checked; // checked -> true oder false von checkbox
  }
}
