import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PChessEngine } from '../engine/pchessengine';
import { Position } from '../models/position';
import { Board } from '../models/board';

@Injectable({ providedIn: 'root' })
export class GameStateService {
  private engine = new PChessEngine();

  private selectedInternal: Position | null = null;
  private legalMovesInternal: Position[] = [];

  private boardSubject = new BehaviorSubject<Board>(this.engine.board);
  private selectedSubject = new BehaviorSubject<Position | null>(null);
  private legalMovesSubject = new BehaviorSubject<Position[]>([]);
  private turnSubject = new BehaviorSubject<'white' | 'black'>(this.engine.currentTurn);
  private checkSubject = new BehaviorSubject<boolean>(this.engine.isInCheck);

  board$ = this.boardSubject.asObservable();
  selected$ = this.selectedSubject.asObservable();
  legalMoves$ = this.legalMovesSubject.asObservable();
  turn$ = this.turnSubject.asObservable();
  check$ = this.checkSubject.asObservable();

  handleSquareClick(pos: Position) {
    const piece = this.engine.getPieceAt(pos);

    // First click
    if (!this.selectedInternal) {
      if (piece && piece.colour === this.engine.currentTurn) { // Bail if clicked on an empty square or an enemy piece
        // Update what was clicked on and determine legal moves
        this.selectedInternal = pos;
        this.legalMovesInternal = this.engine.getLegalMoves(pos);

        // Tell the game board about the update
        this.selectedSubject.next(pos);
        this.legalMovesSubject.next(this.legalMovesInternal);
      }
      return;
    } 

    // Second click
    // Map all legal moves to a lookup set
    const validMoveSet = new Set(
      this.legalMovesInternal.map(this.engine.getPositionKey)
    );
    if (validMoveSet.has(this.engine.getPositionKey(pos))) { // If it's a valid move

      // CORE LOGIC HERE
      this.engine.move(this.selectedInternal, pos);
      this.engine.getCheckState();

      // Tell the game board about the upate
      this.boardSubject.next(this.engine.board);
      this.turnSubject.next(this.engine.currentTurn);
      this.checkSubject.next(this.engine.isInCheck);
    }

    // Reset selection if second click or misclick
    this.selectedInternal = null;
    this.legalMovesInternal = [];
    this.selectedSubject.next(null);
    this.legalMovesSubject.next([]);
  }
}
