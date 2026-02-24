import { PieceType, Piece } from '../../models/piece';
import { Position } from '../../models/position';
import { Board } from '../../models/board';

import { getPawnMoves } from './piece-moves/pawn-moves';
import { getRookMoves } from './piece-moves/rook-moves';
import { getKnightMoves } from './piece-moves/knight-moves';
import { getBishopMoves } from './piece-moves/bishop-moves';
import { getQueenMoves } from './piece-moves/queen-moves';
import { getKingMoves } from './piece-moves/king-moves';

import { uniquePositions } from '../utils/moves-utils';

const moveMap: Record<
  PieceType,
  (piece: Piece, pos: Position, board: Board) => Position[]
> = {
  pawn: getPawnMoves,
  rook: getRookMoves,
  knight: getKnightMoves,
  bishop: getBishopMoves,
  queen: getQueenMoves,
  king: getKingMoves,
};

export function checkLegalMoves(
  piece: (Piece | null),
  pos: Position,
  board: Board
): Position[] {

  if(!piece) return [];
  const generator = moveMap[piece.type];
    return uniquePositions(generator(piece, pos, board));
}
