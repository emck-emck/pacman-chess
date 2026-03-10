import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Piece } from '../../../models/piece';

import { GameStateService } from '../../../service/gamestateservice';

@Component({
  selector: 'promotion',
  templateUrl: './promotion.html',
  styleUrl: './promotion.css',
  imports: [CommonModule],
})
export class PromotionComponent {

  promoColour: 'white' | 'black' = 'white';
  promoRank: number = -1;

  constructor(private gameState: GameStateService) {}

  ngOnInit(){
    this.gameState.turn$.subscribe(t => {
      this.promoColour = t;
    });
    this.gameState.promoting$.subscribe(p => {
      this.promoRank = p;
    });
  }

  handlePromotion(piece: Piece){
    this.gameState.handlePromoClick(piece);
  }
}
