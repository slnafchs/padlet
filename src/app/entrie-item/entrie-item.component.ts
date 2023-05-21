import { Component, EventEmitter,Input, OnInit,Output} from '@angular/core';
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

@Component({
  selector: 'bs-entrie-item',
  templateUrl: './entrie-item.component.html',
  styles: [
  ]
})
export class EntrieItemComponent implements OnInit{
  @Input() entrie: Entrie = EntrieFactory.empty();

  dateString : string = "";

  showComments : boolean = true;
  showRatings : boolean = false;

  commentForm: FormGroup;
  comment: Comment = CommentFactory.empty();

  ratingForm: FormGroup;
  rating: Rating = RatingFactory.empty();
  errors: { [key: string]: string } = {};

  constructor(private bs: PadletService,
              private router: Router,
              private fbc: FormBuilder,
              private fbr: FormBuilder) {
    this.commentForm = this.fbc.group({});
    this.ratingForm = this.fbr.group({});
  }

  ngOnInit() : void {
    if(this.entrie) {
      this.dateString = formatDate(this.entrie!.created_at, 'dd/MM/yyyy', 'en-US');
      this.bs.getUserById(this.entrie.user_id).subscribe((res : User) => {
        this.entrie.user = res;
      });
      this.initCommentForm();
      this.initRatingForm();
    }
  }

  initCommentForm() : void {
    this.commentForm = this.fbc.group({
      id: this.comment.id,
      comment: [this.comment.comment, Validators.required]
    });
    this.commentForm.statusChanges.subscribe(() =>
      this.updateErrorMessages(this.commentForm));
  }

  // Custom validator function
  ratingRangeValidator(control: AbstractControl) {
    const rating = control.value;
    if (rating < 1 || rating > 5) {
      return { ratingRange: true };
    }
    return null;
  }

  initRatingForm() : void {
    this.ratingForm = this.fbr.group({
      id: this.comment.id,
      rating: [this.rating.rating, [Validators.required, this.ratingRangeValidator]]
    });
    this.ratingForm.statusChanges.subscribe(() =>
      this.updateErrorMessages(this.ratingForm));
  }

  updateErrorMessages(fg: FormGroup) {
    console.log("Is form invalid? " + fg.invalid);
    this.errors = {};

    for (const message of EntrieFormErrorMessages) {
      const control = fg.get(message.forControl);
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

  getRating(rating: number) {
    return Array(rating)
  }

  toggleComments() : void {
    this.showComments = true;
    this.showRatings = false;
  }

  toggleRatings() : void {
    this.showRatings = true;
    this.showComments = false;
  }

  delete() : void {
    if(confirm("Möchten Sie diesen Eintrag wirklich löschen?")) {
      this.bs.deleteEntrie(this.entrie.id.toString()).subscribe(res => {
        this.router.navigateByUrl(`/padlets/${this.entrie.padlet_id}`);
        window.location.reload();
      });
    }
  }

  addComment() : void {
    const modalElement = document.getElementById('comment-modal');
    console.log(modalElement);
    if (modalElement) {
      modalElement.classList.add('show');
      modalElement.style.display = "block";
    }
  }

  addRating() : void {
    const modalElement = document.getElementById('rating-modal');
    console.log(modalElement);
    if (modalElement) {
      modalElement.classList.add('show');
      modalElement.style.display = "block";
    }
  }

  modalClose(id: string) : void {
    const modalElement = document.getElementById(id);
    console.log(modalElement);
    if (modalElement) {
      modalElement.classList.remove('show');
      modalElement.style.display = "none";
    }
  }

  async submitCommentForm() {
    this.comment = CommentFactory.fromObject(this.commentForm.value);
    let user_id : string = this.bs.getCurrentUserId();
    let user = await this.getUser(+user_id);
    this.comment.user_id = +user_id;
    this.comment.user = user;
    this.comment.entrie_id = this.entrie.id;

    this.bs.createComment(this.comment, this.entrie.id.toString()).subscribe(res => {
      this.commentForm.reset(CommentFactory.empty());
      this.modalClose('comment-modal');
      window.location.reload();
    });
  }

  async submitRatingForm() {
    this.rating = RatingFactory.fromObject(this.ratingForm.value);
    let user_id : string = this.bs.getCurrentUserId();
    let user = await this.getUser(+user_id);
    this.rating.user_id = +user_id;
    this.rating.user = user;
    this.rating.entrie = this.entrie;
    console.log(this.entrie.id);

    this.bs.createRating(this.rating, this.entrie.id.toString()).subscribe(res => {
      this.ratingForm.reset(CommentFactory.empty());
      this.modalClose('rating-modal');
      window.location.reload();
    });
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
