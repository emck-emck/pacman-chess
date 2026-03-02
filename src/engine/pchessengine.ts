import { Board } from '../models/board';
import { Piece, Colour } from '../models/piece';
import { Position } from '../models/position';
import { Move } from '../models/move';

import { checkLegalMoves } from './moves/moves';
import { initBoard } from './board/board-factory';
import { checkSquare, positionKey } from './utils/engine-utils';
import { findKing, isInCheck } from './moves/moves-utils/moves-utils';

export class PChessEngine {
  private sideToMove: 'white' | 'black' = 'white';

  _board: Board;
  _currentMoves: Move[];
  isInCheck: boolean;
  enPassantTarget: (Position | null);

  constructor() {
    this._board = initBoard();
    this._currentMoves = [];
    this.isInCheck = false;
    this.enPassantTarget = null;
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

  getCheckState(){
    const kingPos = findKing(this.sideToMove, this._board);
    if(!kingPos) {
      this.isInCheck = false; // Throw error
      return;
    }
    this.isInCheck =  isInCheck(this.sideToMove, kingPos, this._board);
  }

  getLegalMoves(pos: Position): Position[]{
    let legalMoves: Position[] = [];

    this._currentMoves = checkLegalMoves(this._board[pos.row][pos.col], pos, this.enPassantTarget, this.getBoardClone());

    for(const m of this._currentMoves){
      legalMoves.push(m.to);
    }

    return legalMoves;
  }

  getPieceAt(pos: Position): (Piece | null){
    return checkSquare(pos, this._board);
  }

  getPositionKey(pos: Position): string {
    return positionKey(pos);
  }  

  move(from: Position, to: Position) {
    const piece: (Piece | null) = this._board[from.row][from.col];
    let move: (Move | null) = null;

    for(const m of this._currentMoves){
      if(m.to.row === to.row && m.to.col === to.col){
        move = m;
        break;
      }
    }

    if(piece && move){
      // Implement capture tracking
      if(move.capture){
        this._board[move.capture.row][move.capture.col] = null;
      }
      // MOVE LOGIC
      switch(move.type){
        case 'normal':
          this._board[from.row][from.col] = null;
          this._board[to.row][to.col] = piece;

          // En passant tracking
          if(piece.type === 'pawn'){
            const pMove = from.row - to.row;
            if(pMove === 2){
              this.enPassantTarget = {row: to.row + 1, col: to.col};
            }else if(pMove === -2){
              this.enPassantTarget = {row: to.row - 1, col: to.col};
            }else{
              this.enPassantTarget = null;
            }
          }else{
            this.enPassantTarget = null;
          }
          break;
        case 'capture':
          this._board[from.row][from.col] = null;
          this._board[to.row][to.col] = piece;
          break;
        case 'en-passant':
          this._board[from.row][from.col] = null;
          this._board[to.row][to.col] = piece;
          break;
        case 'castle':
          break;
        case 'promotion':
          break;
      }
      piece.hasMoved = true;
      this.swapTurn();
    }
  }

  swapTurn() {
    this.sideToMove = this.sideToMove === 'white' ? 'black' : 'white';
  }
}
