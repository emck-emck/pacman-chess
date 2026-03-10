import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ChessEngine } from '../engine/chess-engine';
import { PacmanChessEngine } from '../engine/pacman-chess-engine';

import { Piece } from '../models/piece';
import { Position } from '../models/position';
import { Board } from '../models/board';

import { PROMONULL } from '../constants';

@Injectable({ providedIn: 'root' })
export class GameStateService {
  private engine = new PacmanChessEngine();

  private selectedInternal: Position | null = null;
  private promotingInternal: number = PROMONULL;
  private promotingPieceInternal: (Position | null) = null;

  private boardSubject = new BehaviorSubject<Board>(this.engine.board);
  private selectedSubject = new BehaviorSubject<Position | null>(null);
  private legalMovesSubject = new BehaviorSubject<Position[]>([]);
  private turnSubject = new BehaviorSubject<'white' | 'black'>(this.engine.currentTurn);
  private messageSubject = new BehaviorSubject<string>('white to move');
  private promotionSubject = new BehaviorSubject<number>(this.promotingInternal);

  board$ = this.boardSubject.asObservable();
  selected$ = this.selectedSubject.asObservable();
  legalMoves$ = this.legalMovesSubject.asObservable();
  turn$ = this.turnSubject.asObservable();
  message$ = this.messageSubject.asObservable();
  promoting$ = this.promotionSubject.asObservable();

  handlePieceSelection(pos: Position){
    // Clicking on the same piece deselects it
    if(this.selectedInternal && this.engine.getPositionKey(this.selectedInternal) === this.engine.getPositionKey(pos)) {
      this.selectedInternal = null;
      this.selectedSubject.next(null);
      this.legalMovesSubject.next([]);
      return;
    }

    // Update what was clicked on and determine legal moves
    this.selectedInternal = pos;
    this.engine.getLegalMoves(pos);

    // Tell the game board about the update
    this.selectedSubject.next(pos);
    this.legalMovesSubject.next(this.engine.currentPositions);
  }

  handlePromoClick(piece: Piece){
    if(this.promotingPieceInternal){
      this.engine.promotePiece(this.promotingPieceInternal, piece);
      this.promotingPieceInternal = null;
      this.promotingInternal = PROMONULL;

      // End promotion state
      this.promotionSubject.next(this.promotingInternal);

      // Tell the game board about the upate
      this.boardSubject.next(this.engine.board);
      this.turnSubject.next(this.engine.currentTurn);
      
      // Update game board mesage based on state
      this.updateGameMessage();
    }
  }

  handleSquareClick(pos: Position) {
    if(this.engine.gameOver) return; // Don't register board clicks for ended game

    if(this.promotingInternal > PROMONULL) return; // Don't register board clicks if promoting a pawn

    const piece: (Piece | null) = this.engine.getPieceAt(pos);

    // First click or new piece selection
    if (piece && piece.colour === this.engine.currentTurn) { // Select only if clicking on a valid piece
      this.handlePieceSelection(pos);
      return;
    }
    
    // Don't allow accidental clicks
    if(!this.selectedInternal) return;


    // Second click
    // Map all legal moves to a lookup set
    const validMoveSet = new Set(
      this.engine.currentPositions.map(this.engine.getPositionKey)
    );
    if (validMoveSet.has(this.engine.getPositionKey(pos))) { // If it's a valid move

      // CORE LOGIC HERE
      this.engine.move(this.selectedInternal, pos);

      // Tell the game board about the upate
      this.boardSubject.next(this.engine.board);
      this.turnSubject.next(this.engine.currentTurn);

      // Pause click selection on board if promoting a pawn
      if(this.engine.isPromotionMove(pos)){
        this.promotingInternal = pos.col;
        this.promotingPieceInternal = pos;
        this.promotionSubject.next(this.promotingInternal);
      }
    }

    // Update game board mesage based on state
    this.updateGameMessage();

    // Reset selection if second click
    this.selectedInternal = null;
    this.selectedSubject.next(null);
    this.legalMovesSubject.next([]);
  }

  updateGameMessage(){
    let msg: string;
    if(this.engine.gameOver){
      msg = `Game over, ${this.engine.currentTurn} wins!`;
    }else if(this.engine.isInCheck){
      msg = `${this.engine.currentTurn} to move, is in check`;
    }else if(this.promotingInternal > PROMONULL){
      msg = `${this.engine.currentTurn} to promote`
    }else{
      msg = `${this.engine.currentTurn} to move`;
    }
    this.messageSubject.next(msg);
  }
}
