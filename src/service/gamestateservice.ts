import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PChessEngine } from '../engine/pchessengine';
import { Position } from '../models/position';
import { Board } from '../models/board';
import { positionKey } from '../engine/utils/moves-utils';

@Injectable({ providedIn: 'root' })
export class GameStateService {
  private engine = new PChessEngine();

  private selectedInternal: Position | null = null;
  private legalMovesInternal: Position[] = [];

  private boardSubject = new BehaviorSubject<Board>(this.engine.getBoard());
  private selectedSubject = new BehaviorSubject<Position | null>(null);
  private legalMovesSubject = new BehaviorSubject<Position[]>([]);
  private turnSubject = new BehaviorSubject<'white' | 'black'>(this.engine.currentTurn);

  board$ = this.boardSubject.asObservable();
  selected$ = this.selectedSubject.asObservable();
  legalMoves$ = this.legalMovesSubject.asObservable();
  turn$ = this.turnSubject.asObservable();

  handleSquareClick(pos: Position) {
    const piece = this.engine.getPieceAt(pos);

    // First click
    if (!this.selectedInternal) {
      if (piece && piece.colour === this.engine.currentTurn) {
        this.selectedInternal = pos;
        this.legalMovesInternal = this.engine.getLegalMoves(pos);

        this.selectedSubject.next(pos);
        this.legalMovesSubject.next(this.legalMovesInternal);
      }
      return;
    } 

    // Second click
    const validMoveSet = new Set(
      this.legalMovesInternal.map(positionKey)
    );
    if (validMoveSet.has(positionKey(pos))) {
      this.engine.move(this.selectedInternal, pos);
      this.boardSubject.next(this.engine.getBoard());
      this.turnSubject.next(this.engine.currentTurn);
    }

    // Reset selection either way
    this.selectedInternal = null;
    this.legalMovesInternal = [];
    this.selectedSubject.next(null);
    this.legalMovesSubject.next([]);
  }
}
