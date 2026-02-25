import { Piece } from '../../../../models/piece';
import { Position } from '../../../../models/position';
import { Board } from '../../../../models/board';

import { getRBQAttacks } from './misc-attacks/r-b-q-attacks';

export function getBishopAttacks(
  piece: Piece,
  pos: Position,
  board: Board
): Position[] {
  
  const bishopDirections: Position[] = [
    {row: -1, col: -1},
    {row: -1, col: 1},
    {row: 1, col: -1},
    {row: 1, col: 1},
  ];
  
    return getRBQAttacks(piece, pos, board, bishopDirections);
}
