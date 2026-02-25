import { Position } from '../../models/position';
import { BOARDSIZE } from '../constants';

import { positionKey } from '../utils/engine-utils';

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