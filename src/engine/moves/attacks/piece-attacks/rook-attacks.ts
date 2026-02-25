import { Piece } from '../../../../models/piece';
import { Position } from '../../../../models/position';
import { Board } from '../../../../models/board';

import { getRBQAttacks } from './misc-attacks/r-b-q-attacks';

export function getRookAttacks(
  piece: Piece,
  pos: Position,
  board: Board
): Position[] {
  
  const rookDirections: Position[] = [
    {row: -1, col: 0},
    {row: 1, col: 0},
    {row: 0, col: -1},
    {row: 0, col: 1},
  ];
  
    return getRBQAttacks(piece, pos, board, rookDirections);
}
