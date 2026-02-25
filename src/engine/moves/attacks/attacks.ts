import { PieceType, Piece } from '../../../models/piece';
import { Position } from '../../../models/position';
import { Board } from '../../../models/board';

import { getPawnAttacks } from './piece-attacks/pawn-attacks';
import { getRookAttacks } from './piece-attacks/rook-attacks';
import { getKnightAttacks } from './piece-attacks/knight-attacks';
import { getBishopAttacks } from './piece-attacks/bishop-attacks';
import { getQueenAttacks } from './piece-attacks/queen-attacks';
import { getKingAttacks } from './piece-attacks/king-attacks';

import { uniquePositions } from '../moves-utils';

const moveMap: Record<
  PieceType,
  (piece: Piece, pos: Position, board: Board) => Position[]
> = {
  pawn: getPawnAttacks,
  rook: getRookAttacks,
  knight: getKnightAttacks,
  bishop: getBishopAttacks,
  queen: getQueenAttacks,
  king: getKingAttacks,
};

export function getAttacks(
  piece: (Piece | null),
  pos: Position,
  board: Board
): Position[] {

  if(!piece) return [];
  const generator = moveMap[piece.type];
    return uniquePositions(generator(piece, pos, board));
}
