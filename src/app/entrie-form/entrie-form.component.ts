import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { User} from "../shared/padlet";
import {PadletFactory} from "../shared/padlet-factory";
import {PadletService} from "../shared/padlet.service";
import {ActivatedRoute, Router} from "@angular/router";
import {EntrieFormErrorMessages} from "../entrie-form/entrie-form-error-messages";
import {EntrieFactory} from "../shared/entrie-factory";
import {Entrie} from "../shared/entrie";

@Component({
  selector: 'bs-entrie-form',
  templateUrl: './entrie-form.component.html',
  styles: [
  ]
})
export class EntrieFormComponent implements OnInit {
  title : string = "Eintrag erstellen";
  entrieForm: FormGroup;
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

  ngOnInit(): void {
    this.padlet_id = this.route.snapshot.params["padlet_id"];
    const id = this.route.snapshot.params["entrie_id"];
    console.log(this.padlet_id);
    console.log(id);
    if (id) {
      this.isUpdatingEntrie = true;
      this.title = "Eintrag bearbeiten";
      this.bs.getSingleEntrie(id).subscribe(
        (res : Entrie) => {
          this.entrie = res;
          this.initEntrie();
        }
      );
    }
    this.initEntrie();
  }

  initEntrie() : void {
    this.entrieForm = this.fb.group({
      id: this.entrie.id,
      title: [this.entrie.title, Validators.required],
      content: [this.entrie.content, Validators.required]
    });
    this.entrieForm.statusChanges.subscribe(() =>
      this.updateErrorMessages());
  }

  updateErrorMessages() {
    console.log("Is form invalid? " + this.entrieForm.invalid);
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

  async submitForm() {

    if (this.isUpdatingEntrie) {
      let entrie = EntrieFactory.fromObject(this.entrieForm.value);
      this.entrie.title = entrie.title;
      this.entrie.content = entrie.content;
      this.bs.updateEntrie(this.entrie).subscribe(res => {
        this.router.navigate(["padlets", this.padlet_id]);
      });
    } else {
      this.entrie = EntrieFactory.fromObject(this.entrieForm.value);
      let user_id : string = this.bs.getCurrentUserId();
      let user = await this.getUser(+user_id);
      this.entrie.user_id = +user_id;
      this.entrie.user = user
      this.entrie.padlet_id = this.padlet_id;
      this.entrie.comments = [];
      this.entrie.ratings = [];

      this.bs.createEntrie(this.entrie, this.padlet_id.toString()).subscribe(res => {
        this.entrie = EntrieFactory.empty();
        this.entrieForm.reset(PadletFactory.empty());
        this.router.navigate(["padlets", this.padlet_id]);
      });
    }
  }

  async getUser(id: number) : Promise<User> {
    return new Promise((resolve, reject) => {
      this.bs.getUserById(id).subscribe((res: User) => {
          resolve(res);
        },
        error => {
          reject("Error getting user.")
        });
    })
  }
}
