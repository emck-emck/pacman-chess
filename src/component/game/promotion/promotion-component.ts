import { Component } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';

import { Piece } from '../../../models/piece';

import { GameStateService } from '../../../service/gamestateservice';

@Component({
  selector: 'promotion',
  templateUrl: './promotion.html',
  styleUrl: './promotion.css',
  imports: [AsyncPipe, CommonModule],
})
export class PromotionComponent {

  isPromoting$ = this.gameState.promoting$;
  turn$ = this.gameState.turn$;

  promoColour: 'white' | 'black' = 'white';

  constructor(private gameState: GameStateService) {}

  ngOnInit(){
    this.gameState.turn$.subscribe(t => {
        this.promoColour = t;
    })
  }

  handlePromotion(piece: Piece){
    this.gameState.handlePromoClick(piece);
  }
}
