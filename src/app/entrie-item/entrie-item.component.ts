import { Component, EventEmitter,Input, OnInit,Output} from '@angular/core';
import {Comment, Entrie, User} from "../shared/comment";
import { Rating } from "../shared/rating";
import {EntrieFactory} from "../shared/entrie-factory";
import {formatDate} from "@angular/common";
import {PadletService} from "../shared/padlet.service";

@Component({
  selector: 'bs-entrie-item',
  templateUrl: './entrie-item.component.html',
  styles: [
  ]
})
export class EntrieItemComponent implements OnInit{
  @Input() entrie : Entrie = EntrieFactory.empty();

  dateString : string = "";

  showComments : boolean = true;
  showRatings : boolean = false;

  constructor(private bs: PadletService,) {
  }

  ngOnInit() : void {
    if(this.entrie) {
      this.dateString = formatDate(this.entrie!.created_at, 'dd/MM/yyyy', 'en-US');
      this.bs.getUserById(this.entrie.user_id).subscribe((res : User) => {
        this.entrie.user = res;
      });
    }
    console.log(this.entrie)
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
}
