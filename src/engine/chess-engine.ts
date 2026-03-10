import { Board } from '../models/board';
import { Piece, Colour } from '../models/piece';
import { Position } from '../models/position';
import { Move } from '../models/move';

import { checkLegalMoves } from './moves/moves';
import { initBoard } from './board/board-factory';
import { positionKey } from './utils/engine-utils';
import { findKing, isInCheck } from './moves/moves-utils/moves-utils';

export class ChessEngine {
  
  private _board: Board;
  private _currentMoves: Move[];
  
  private enPassantTarget: (Position | null);
  private checkState: boolean;
  private isGameOver: boolean;
  private sideToMove: 'white' | 'black' = 'white';

  constructor() {
    this._board = initBoard();
    this._currentMoves = [];
    this.checkState = false;
    this.isGameOver = false;
    this.enPassantTarget = null;
  }

  get board(): Board {
    return this._board;
  }

   get currentMoves(): Move[]{
    return this._currentMoves;
  }

  get currentPositions(): Position[]{
    let legalMoves: Position[] = [];

    for(const m of this._currentMoves){
      legalMoves.push(m.to);
    }

    return legalMoves;
  }

  get currentTurn(): 'white' | 'black' {
    return this.sideToMove;
  }

  get gameOver(): boolean{
    return this.isGameOver;
  }
  
  get isInCheck(): boolean {
    return this.checkState;
  }

  checkSquare(pos: Position, board: Board): (Piece | null){
    if(!this.isInBounds(pos, board)) return null;
    
      return board[pos.row][pos.col];
  }

  getBoardClone(){
    return structuredClone(this._board);
  }

  getCheckState(colour: Colour): boolean{
    const kingPos = findKing(colour, this._board);
    if(!kingPos) {
      return false; // Throw error
    }
    return isInCheck(this, colour, kingPos, this._board);
  }

  getLegalMoves(pos: Position){
    this._currentMoves = checkLegalMoves(this, this._board[pos.row][pos.col], pos, this.enPassantTarget, this.getBoardClone());
  }

  getPieceAt(pos: Position): (Piece | null){
    return this.checkSquare(pos, this.board)
  }

  getMoveKey(move: Move): string{
    return `${move.to.row},${move.to.col}-${move.promotion}`;
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
        this.checkState = true;
        this.swapTurn();
      }
    }else{
      this.checkState = false;
      this.swapTurn();
    }
  }

  // Returns true if the given colour has no possible moves left
  isEndGame(colour: Colour){
    let allMoves: Move[] = [];
    for(let row = 0; row < this._board.length; row++){
      for(let col = 0; col < this._board[row].length; col++){
        const piece = this._board[row][col];
        if(piece && piece.colour === colour){
          const pos = {row: row, col: col}
          this.getLegalMoves(pos); // Update _currentMoves with the given piece legal moves
          for(const m of this._currentMoves){
            allMoves.push(m);
          }
        }
      }
    }
    return allMoves.length === 0;
  }

  isInBounds(pos: Position, board: Board): boolean {
    return pos.row >= 0 && pos.row < board.length && pos.col >= 0 && pos.col < board[0].length;
  }

  // Returns true if there is more than one move to a position with the same coordinates
  isPromotionMove(pos: Position): boolean{
    let count: number = 0;
    for(const m of this._currentMoves){
      if(m.to.row === pos.row && m.to.col === pos.col) count++;
    }
    return count > 1;
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
          this.handleTurnEnd();
          break;
        case 'castle':
          // Move king
          this._board[move.from.row][move.from.col] = null;
          this._board[move.to.row][move.to.col] = piece;
          this.handleTurnEnd();
          //Move rook
          if(move.secondaryMoves){
            const rook: (Piece | null) = this._board[move.secondaryMoves.from.row][move.secondaryMoves.from.col]
            this._board[move.secondaryMoves.from.row][move.secondaryMoves.from.col] = null;
            this._board[move.secondaryMoves.to.row][move.secondaryMoves.to.col] = rook;
          }
          this.handleTurnEnd();
          break;
        case 'promotion':
          this._board[move.from.row][move.from.col] = null;
          this._board[move.to.row][move.to.col] = piece;
          break;
      }
      piece.hasMoved = true;
    }
  }

  moveColLeft(col: number, moveBy: number): number {
    return col - moveBy;
  }

  moveColRight(col: number, moveBy: number): number{
    return col + moveBy;
  }

  promotePiece(pos: Position, piece: Piece){
    this._board[pos.row][pos.col] = piece;
    this.handleTurnEnd();
  }

  swapTurn(){
    this.sideToMove = this.sideToMove === 'white' ? 'black' : 'white';
  }
}
