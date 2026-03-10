import { Piece } from '../../../../../models/piece';
import { Position } from '../../../../../models/position';
import { Board } from '../../../../../models/board';
import { Move } from '../../../../../models/move';

import { getRBQAttacks } from './misc-attacks/r-b-q-attacks';
import { ChessEngine } from '../../../../chess-engine';

export function getRookAttacks(
  engine: ChessEngine,
  piece: Piece,
  pos: Position,
  board: Board
): Move[] {
  
  const rookDirections: Position[] = [
    {row: -1, col: 0},
    {row: 1, col: 0},
    {row: 0, col: -1},
    {row: 0, col: 1},
  ];
  
    return getRBQAttacks(engine, piece, pos, board, rookDirections);
}
