import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Comment, Entrie, User} from "../shared/comment";
import { Rating } from "../shared/rating";
import {EntrieFactory} from "../shared/entrie-factory";
import {formatDate} from "@angular/common";
import {PadletService} from "../shared/padlet.service";
import {Router} from "@angular/router";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CommentFactory} from "../shared/comment-factory";
import {EntrieFormErrorMessages} from "../entrie-form/entrie-form-error-messages";
import {PadletFactory} from "../shared/padlet-factory";
import {RatingFactory} from "../shared/rating-factory";
import { Userright } from '../shared/userright';
import { UserrightFactory } from '../shared/userright-factory';
import { AuthenticationService } from '../shared/authentication.service';

@Component({
  selector: 'bs-entrie-item',
  templateUrl: './entrie-item.component.html',
  styles: [
  ]
})
export class EntrieItemComponent implements OnInit{
  @Input() entrie: Entrie = EntrieFactory.empty();
  @Input() userrights: Userright = UserrightFactory.empty();
  entrie_id : number = 0;

  dateString : string = "";

  showComments : boolean = true;
  showRatings : boolean = false;

  commentForm: FormGroup;
  comment: Comment = CommentFactory.empty();

  ratingForm: FormGroup;
  rating: Rating = RatingFactory.empty();

  constructor(private bs: PadletService,
              private authService: AuthenticationService,
              private router: Router,
              private fbc: FormBuilder,
              private fbr: FormBuilder) {
    this.commentForm = this.fbc.group({});
    this.ratingForm = this.fbr.group({});
  }

  //initialisieren von Entrie
  ngOnInit() : void {
    if(this.entrie) { //wenn Entrie existiert
      //Erstelldatum formatieren
      this.dateString = formatDate(this.entrie!.created_at, 'dd/MM/yyyy', 'en-US');
      //getUserById von service liefert Ergebnis res
      this.bs.getUserById(this.entrie.user_id).subscribe((res : User) => {
        //res wird zu lokalen entrie.user
        this.entrie.user = res;
      });
      //Kommentar Formular initialisieren
      this.initCommentForm();
      //Rating Formular initialisieren
      this.initRatingForm();
      //entrie.id wird nochmals in lokaler id gespeichert
      this.entrie_id = this.entrie.id;
    }
  }

  //Kommentar Formular initialisieren
  initCommentForm() : void {
    this.commentForm = this.fbc.group({
      //formGroup von HTML
      id: this.comment.id,
      comment: [this.comment.comment, Validators.required]
    });
  }

  // Validator, um zu schauen, ob Rating zwischen 1 und 5 ist
  ratingRangeValidator(control: AbstractControl) {
    //Wert von control wird zu const rating
    const rating = control.value;
    //wenn Rating kleiner 1 oder größer 5
    if (rating < 1 || rating > 5) {
      //dann ist ratingRange true
      return { ratingRange: true };
    }
    return null;
  }

  //Rating Formular initialisieren
  initRatingForm() : void {
    this.ratingForm = this.fbr.group({
      //formGroup in HTML
      id: this.comment.id,
      rating: [this.rating.rating, [Validators.required, this.ratingRangeValidator]]
    });
  }

  //Ratings holen
  getRating(rating: number) {
    return Array(rating)
  }

  //Ansicht der Kommentare öffnen
  toggleComments() : void {
    this.showComments = true;
    this.showRatings = false;
  }

  //Ansicht der Ratings öffnen
  toggleRatings() : void {
    this.showRatings = true;
    this.showComments = false;
  }

  //Entrie löschen
  delete() : void {
    if(confirm("Möchten Sie diesen Eintrag wirklich löschen?")) { //window.confirm, ähnlich wie alert
      //deleteEntrie von service löscht Entrie und bleibt auf der selben Seite (padlet-details)
      this.bs.deleteEntrie(this.entrie.id.toString()).subscribe(res => {
        this.router.navigateByUrl(`/padlets/${this.entrie.padlet_id}`);
        //auch wenn entrie jetzt gelöscht ist, kann man auf entrie.padlet_id navigieren da entrie
        //noch lokal gespeichert ist
        //Seite wird neu geladen
        window.location.reload();
      });
    }
  }

  //Kommentar hinzufügen
  addComment() : void {
    //modal mit der comment-modal-id wird eine const
    const modalElement = document.getElementById(`comment-modal-${this.entrie_id}`);
    if (modalElement) { //wenn modal exisitiert
      modalElement.classList.add('show'); //show wird zur class hinzugefügt und man kann es sehen
      modalElement.style.display = "block"; //weil display vorher "none" war
    }
  }

  //Rating hinzufügen
  addRating() : void {
    //modal mit der rating-modal-id wird eine const
    const modalElement = document.getElementById(`rating-modal-${this.entrie_id}`);
    if (modalElement) { //wenn modal existiert
      modalElement.classList.add('show'); //show wird zur class hinzugefügt und man kann es sehen
      modalElement.style.display = "block"; //weil display vorher "none" war
    }
  }

  //Modal schließen
  modalClose() : void {
    //es wird jedes Modal ausgewählt
    document.querySelectorAll<HTMLElement> ('.modal').forEach(it => {
      it.classList.remove('show'); //show wird von class entfernt
      it.style.display = "none"; //display wird wieder none
    });
  }

  //Kommentarformular wird abgeschickt
  async submitCommentForm() {
    //Werte des Kommentarformulars werden in lokales comment gespeichert
    this.comment = CommentFactory.fromObject(this.commentForm.value);
    //user_id wird aus session storage geholt
    let user_id : string = this.bs.getCurrentUserId();
    //user wird mit service aus Datenbank geholt (warten)
    let user = await this.getUser(+user_id);
    //die user_id wird im Kommentar gespeichert
    this.comment.user_id = +user_id;
    //der user wird im Kommentar gespeichert
    this.comment.user = user;

    //createComment von service erstellt Comment
    this.bs.createComment(this.comment, this.entrie_id.toString()).subscribe(res => {
      //wenn es erstellt worden ist, wird das Kommentar Formular zurückgesetzt
      this.commentForm.reset(CommentFactory.empty());
      this.modalClose(); //Modal schließt
      window.location.reload(); //Seite wird neu geladen
    });
  }

  //Ratingformular wird abgeschickt
  async submitRatingForm() {
    //Werte des Rating Formulars werden in lokales rating gespeichert
    this.rating = RatingFactory.fromObject(this.ratingForm.value);
    //user_id wird aus session storage geholt
    let user_id : string = this.bs.getCurrentUserId();
    //user wird mit service aus Datenbank geholt (warten)
    let user = await this.getUser(+user_id);
    //die user_id wird im Rating gespeichert
    this.rating.user_id = +user_id;
    //der user wird im Rating gespeichert
    this.rating.user = user;
    //der entrie wird im Rating gespeichert
    this.rating.entrie = this.entrie;

    //createRating von service erstellt Rating
    this.bs.createRating(this.rating, this.entrie.id.toString()).subscribe(res => {
      //wenn es erstellt worden ist, wird das Rating Formular zurückgesetzt
      this.ratingForm.reset(RatingFactory.empty());
      this.modalClose() //Modal wird geschlossen
      window.location.reload(); //seite wird neu geladen
    });
  }

  //holt User
  async getUser(id: number) : Promise<User> {
    return new Promise((resolve, reject) => {
      //getUserById von service holt den User mit der ID
      this.bs.getUserById(id).subscribe((res: User) => {
          resolve(res);
        },
        error => {
          reject("Error getting user.")
        });
    })
  }

  //schaut, ob User eingeloggt ist
  isLoggedIn() {
    //checkt im authentication.service.ts, ob token existiert und gültig ist
    return this.authService.isLoggedIn();
  }
}
