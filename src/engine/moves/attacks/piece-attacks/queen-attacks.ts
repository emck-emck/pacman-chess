import { Piece } from '../../../../models/piece';
import { Position } from '../../../../models/position';
import { Board } from '../../../../models/board';

import { getRBQAttacks } from './misc-attacks/r-b-q-attacks';

export function getQueenAttacks(
  piece: Piece,
  pos: Position,
  board: Board
): Position[] {
  
  const queenDirections: Position[] = [
    //Cross-wise
    {row: -1, col: 0},
    {row: 1, col: 0},
    {row: 0, col: -1},
    {row: 0, col: 1},
    //Diagonal
    {row: -1, col: -1},
    {row: -1, col: 1},
    {row: 1, col: -1},
    {row: 1, col: 1}
  ];
  
    return getRBQAttacks(piece, pos, board, queenDirections);
}
