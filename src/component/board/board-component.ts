import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { Position } from '../../models/position';

import { SquareComponent } from '../square/square-component';
import { GameStateService } from '../../service/gamestateservice';

@Component({
  selector: 'board',
  templateUrl: './board.html',
  styleUrl: './board.css',
  imports: [AsyncPipe, SquareComponent],
})
export class BoardComponent {
  board$ = this.gameState.board$;
  selectedPiece$ = this.gameState.selected$;
  legalMoves$ = this.gameState.legalMoves$;

  legalMoveSet = new Set<string>();
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
  }

  isLight(row: number, col: number): boolean {
    return (((row + col)%2) == 0);
  }

  isLegal(row: number, col: number): boolean {
    return this.legalMoveSet.has(`${row},${col}`);
  }

  isSelected(row: number, col: number): boolean{
    return (this.selected == `${row},${col}`);
  }
}
