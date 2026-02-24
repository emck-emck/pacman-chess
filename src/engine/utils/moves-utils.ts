import { Piece } from '../../models/piece';
import { Position } from '../../models/position';
import { Board } from '../../models/board';
import { BOARDSIZE } from '../constants';

export function checkSquare(pos: Position, board: Board): (Piece | null) {
  return board[pos.row][pos.col];
}

export function positionKey(pos: Position): string {
  return `${pos.row},${pos.col}`;
} 

export function uniquePositions(moves: Position[]): Position[] {
  const seen = new Set<string>();

  return moves.filter(move => {
    const key = positionKey(move);

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

//MOVEBY MUST BE LESS THAN BOARD SIZE
export function moveColLeft(col: number, moveBy: number): number {
  return ((col + (BOARDSIZE - moveBy)) % BOARDSIZE)
}

export function moveColRight(col: number, moveBy: number): number{
  return ((col + moveBy) % BOARDSIZE);
}