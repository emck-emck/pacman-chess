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
  private _board: Board;
  private _currentMoves: Move[];
  private enPassantTarget: (Position | null);

  isInCheck: boolean;
  isGameOver: boolean;

  constructor() {
    this._board = initBoard();
    this._currentMoves = [];
    this.isInCheck = false;
    this.isGameOver = false;
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

  getCheckState(colour: Colour): boolean{
    const kingPos = findKing(colour, this._board);
    if(!kingPos) {
      return false; // Throw error
    }
    return isInCheck(colour, kingPos, this._board);
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

  handleTurnEnd() {
    const opponent: Colour = this.currentTurn === 'white'? 'black': 'white';
    const isOpponentInCheck: boolean = this.getCheckState(opponent);
    if(isOpponentInCheck){
      const isEndGame: boolean = this.isEndGame(opponent);
      if(isEndGame){
        this.isGameOver = true;
      }else{
        this.isInCheck = true;
        this.swapTurn();
      }
    }else{
      this.isInCheck = false;
      this.swapTurn();
    }
  }

  // Returns true if the given colour has no possible moves left
  isEndGame(colour: Colour){
    let allMoves: Position[] = [];
    let boardClone: Board;
    for(let row = 0; row < this._board.length; row++){
      for(let col = 0; col < this._board[row].length; col++){
        const piece = this._board[row][col];
        if(piece && piece.colour === colour){
          const pos = {row: row, col: col}
          const moves: Position[] = this.getLegalMoves(pos);
          for(const m of moves){
            allMoves.push(m);
          }
        }
      }
    }
    return allMoves.length === 0;
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

      // En passant tracking
      if(piece.type === 'pawn'){
        const pMove = move.from.row - move.to.row;
        if(pMove === 2){
          this.enPassantTarget = {row: move.to.row + 1, col: move.to.col};
        }else if(pMove === -2){
          this.enPassantTarget = {row: move.to.row - 1, col: move.to.col};
        }else{
          this.enPassantTarget = null;
        }
      }else{
        this.enPassantTarget = null;
      }
      
      // MOVE LOGIC
      switch(move.type){
        case 'normal':
        case 'capture':
        case 'en-passant':
          this._board[move.from.row][move.from.col] = null;
          this._board[move.to.row][move.to.col] = piece;
          break;
        case 'castle':
          // Move king
          this._board[move.from.row][move.from.col] = null;
          this._board[move.to.row][move.to.col] = piece;
          //Move rook
          if(move.secondaryMoves){
            const rook: (Piece | null) = this._board[move.secondaryMoves.from.row][move.secondaryMoves.from.col]
            this._board[move.secondaryMoves.from.row][move.secondaryMoves.from.col] = null;
            this._board[move.secondaryMoves.to.row][move.secondaryMoves.to.col] = rook;
          }
          break;
        case 'promotion':
          break;
      }
      piece.hasMoved = true;
      this.handleTurnEnd();
    }
  }

  swapTurn(){
    this.sideToMove = this.sideToMove === 'white' ? 'black' : 'white';
  }
}
