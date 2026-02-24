import { Piece } from '../../../models/piece';
import { Position } from '../../../models/position';
import { Board } from '../../../models/board';

import { getRBQMoves } from './misc-moves/r-b-q-moves';

export function getBishopMoves(
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
  
    return getRBQMoves(piece, pos, board, bishopDirections);
}
