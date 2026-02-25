import { Board } from '../models/board';
import { Piece, Colour } from '../models/piece';
import { Position } from '../models/position';

import { checkLegalMoves } from './moves/moves';
import { initBoard } from './board/board-factory';
import { checkSquare, positionKey } from './utils/engine-utils';

export class PChessEngine {
  private sideToMove: 'white' | 'black' = 'white';

  board: Board;

  constructor() {
    this.board = initBoard();
  }

  get currentTurn(): 'white' | 'black' {
    return this.sideToMove;
  }

  swapTurn() {
    this.sideToMove = this.sideToMove === 'white' ? 'black' : 'white';
  }

  getBoard(): Board {
    return this.board;
  }

  getPieceAt(pos: Position): (Piece | null){
    return checkSquare(pos, this.board);
  }

  getPositionKey(pos: Position): string {
    return positionKey(pos);
  }

  getLegalMoves(pos: Position): Position[]{
    return checkLegalMoves(this.board[pos.row][pos.col], pos, this.board);
  }

  move(from: Position, to: Position) {
    const pHolder: (Piece | null) = this.board[from.row][from.col];
    if(pHolder){
      pHolder.hasMoved = true;
      this.board[from.row][from.col] = null;
      this.board[to.row][to.col] = pHolder;
      this.swapTurn();
    }
  }
}
