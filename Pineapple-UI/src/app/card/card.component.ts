import { Component, OnInit } from '@angular/core';
import {Card} from '../model/card';
import {CardService} from '../service/card.service';
import {Router} from '@angular/router';
import {FormGroup} from '@angular/forms';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  createCardForm: FormGroup;
  cards: Card[];
  constructor(
    private router: Router,
    private cardService: CardService
  ) { }

  ngOnInit() {
    this.cardService.getCards().subscribe(
      data => { this.cards = data; }
    );
  }
  get getField() { return this.createCardForm.controls; }
  createCard() {
    console.log('Creating card');
    if (this.createCardForm.invalid) { return; }
    console.log('Creating card with: ' + this.createCardForm.getRawValue());
    this.cardService.createCard(this.createCardForm.getRawValue())
      .subscribe(params => { });
}

  editCard(card: Card): void {
    this.cardService.editCard(card)
      .subscribe(params => {
        this.cards = this.cards.filter(c => c !== card);
      });
  }
}
