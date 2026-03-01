import { Board } from '../models/board';
import { Piece, Colour } from '../models/piece';
import { Position } from '../models/position';
import { Move } from '../models/move';

import { checkLegalMoves } from './moves/moves';
import { initBoard } from './board/board-factory';
import { checkSquare, positionKey } from './utils/engine-utils';

export class PChessEngine {
  private sideToMove: 'white' | 'black' = 'white';

  _board: Board;
  _currentMoves: Move[];

  constructor() {
    this._board = initBoard();
    this._currentMoves = [];
  }

  get board(): Board {
    return this._board;
  }

  get currentTurn(): 'white' | 'black' {
    return this.sideToMove;
  }

  getBoardClone(){
    return structuredClone(this._board);
  }

  swapTurn() {
    this.sideToMove = this.sideToMove === 'white' ? 'black' : 'white';
  }

  getPieceAt(pos: Position): (Piece | null){
    return checkSquare(pos, this._board);
  }

  getPositionKey(pos: Position): string {
    return positionKey(pos);
  }

  getLegalMoves(pos: Position): Position[]{
    let legalMoves: Position[] = [];

    this._currentMoves = checkLegalMoves(this._board[pos.row][pos.col], pos, this.getBoardClone());

    for(const m of this._currentMoves){
      legalMoves.push(m.to);
    }

    return legalMoves;
  }

  move(from: Position, to: Position) {
    const pHolder: (Piece | null) = this._board[from.row][from.col];
    if(pHolder){
      pHolder.hasMoved = true;
      this._board[from.row][from.col] = null;
      this._board[to.row][to.col] = pHolder;
      this.swapTurn();
    }
  }
}
