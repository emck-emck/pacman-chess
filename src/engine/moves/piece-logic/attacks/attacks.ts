import { PieceType, Piece } from '../../../../models/piece';
import { Position } from '../../../../models/position';
import { Board } from '../../../../models/board';
import { Move } from '../../../../models/move';

import { getPawnAttacks } from './piece-attacks/pawn-attacks';
import { getRookAttacks } from './piece-attacks/rook-attacks';
import { getKnightAttacks } from './piece-attacks/knight-attacks';
import { getBishopAttacks } from './piece-attacks/bishop-attacks';
import { getQueenAttacks } from './piece-attacks/queen-attacks';
import { getKingAttacks } from './piece-attacks/king-attacks';

import { uniqueMoves } from '../../moves-utils/moves-utils';

const moveMap: Record<
  PieceType,
  (piece: Piece, pos: Position, board: Board) => Move[]
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
): Move[] {

  if(!piece) return [];
  const generator = moveMap[piece.type];
  return uniqueMoves(generator(piece, pos, board));
}
