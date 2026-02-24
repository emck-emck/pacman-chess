import { Board } from '../models/board';
import { Piece, Colour } from '../models/piece';
import { Position } from '../models/position';

import { checkLegalMoves } from './moves/legal-moves';
import { initBoard } from './board/board-factory';
import { checkSquare } from './utils/moves-utils';

export class PChessEngine {
  private currentTurn: Colour = 'white';
  board: Board;

  constructor() {
    this.board = initBoard();
  }

  test(pos: Position) {
    this.board[pos.row][pos.col] = null;
  }

  getBoard() {
    return this.board;
  }

  getTurn() {
    return this.currentTurn;
  }

  getPieceAt(pos: Position): (Piece | null){
    return checkSquare(pos, this.board);
  }

  isLegalMove(from: Position, to: Position): boolean{
    return true;
  }

  getLegalMoves(pos: Position): Position[]{
    return checkLegalMoves(this.board[pos.row][pos.col], pos, this.board);
  }

  move(from: Position, to: Position) {
    console.log("Moving piece");
    const pHolder: (Piece | null) = this.board[from.row][from.col];
    if(pHolder){
      this.board[from.row][from.col] = null;
      this.board[to.row][to.col] = pHolder;
    }
  }
}
