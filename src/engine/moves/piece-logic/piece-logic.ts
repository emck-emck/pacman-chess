import { Colour, Piece } from '../../../models/piece';
import { Position } from '../../../models/position';
import { Board } from '../../../models/board';
import { Move } from '../../../models/move';

import { simultateMove, isInCheck, findKing } from '../moves-utils/moves-utils';

import { getAttacks } from './attacks/attacks';
import { ChessEngine } from '../../chess-engine';

export function pieceLogic(
  engine: ChessEngine,
  piece: Piece,
  pos: Position,
  board: Board
): Move[] {
  const colour: Colour = piece.colour;
  const possible: Move[] = getAttacks(engine, piece, pos, board);
  const kingPos: Position | null = findKing(colour, board);

  if (!kingPos) return [];

  return possible.filter(move => {
    const sim: Board = simultateMove(move, board);
    return !isInCheck(engine, colour, kingPos, sim);
  });
}
