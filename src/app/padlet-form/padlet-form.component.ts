import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Padlet} from "../shared/padlet";
import {PadletFactory} from "../shared/padlet-factory";
import {PadletService} from "../shared/padlet.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PadletFormErrorMessages} from "./padlet-form-error-messages";

@Component({
  selector: 'bs-padlet-form',
  templateUrl: './padlet-form.component.html',
  styles: [
  ]
})
export class PadletFormComponent implements OnInit{

  padletForm: FormGroup;
  padlet: Padlet = PadletFactory.empty();
  errors: { [key: string]: string } = {};


  constructor(
    private fb: FormBuilder,
    private bs: PadletService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.padletForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.padletForm = this.fb.group({
      id: this.padlet.id,
      name: [this.padlet.name, Validators.required],
    });
    this.initPadlet();
  }

  initPadlet() : void {
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

  submitForm() {
    const padlet: Padlet = PadletFactory.fromObject(this.padletForm.value);
    console.log(padlet);
    console.log(padlet.name.toUpperCase());


  }
}
