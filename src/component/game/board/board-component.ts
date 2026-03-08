import { Component } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';

import { Position } from '../../../models/position';

import { SquareComponent } from '../square/square-component';
import { GameStateService } from '../../../service/gamestateservice';
import { PromotionComponent } from '../promotion/promotion-component';

@Component({
  selector: 'board',
  templateUrl: './board.html',
  styleUrl: './board.css',
  imports: [AsyncPipe, CommonModule, SquareComponent, PromotionComponent],
})
export class BoardComponent {
  board$ = this.gameState.board$;
  selectedPiece$ = this.gameState.selected$;
  legalMoves$ = this.gameState.legalMoves$;
  msg$ = this.gameState.message$;

  legalMoveSet = new Set<string>();
  message: string = '';
  selected: string = '';

  constructor(private gameState: GameStateService) {}

  onSquareClick(pos: Position) {
    this.gameState.handleSquareClick(pos);
  }

  ngOnInit() {
    this.gameState.legalMoves$.subscribe(moves => {
      this.legalMoveSet = new Set(
        moves.map(m => `${m.row},${m.col}`)
      );
    });
    this.gameState.selected$.subscribe(sel => {
      sel? this.selected = `${sel.row},${sel.col}`: this.selected = ''
    });
    this.gameState.message$.subscribe(m => {
      this.message = m;
    });
  }

  isLegal(row: number, col: number): boolean {
    return this.legalMoveSet.has(`${row},${col}`);
  }

  isLight(row: number, col: number): boolean {
    return (((row + col)%2) == 0);
  }

  isSelected(row: number, col: number): boolean{
    return (this.selected == `${row},${col}`);
  }
}
