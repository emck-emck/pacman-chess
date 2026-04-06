import { Piece } from '../../../../../models/piece';
import { Position } from '../../../../../models/position';
import { Board } from '../../../../../models/board';
import { Move } from '../../../../../models/move';

import { generateCaptureMove } from '../../../moves-utils/moves-factory';

import { ChessEngine } from '../../../../chess-engine';

export function getPawnAttacks(
  engine: ChessEngine,
  piece: Piece,
  pos: Position,
  board: Board
): Move[] {
  const up: -1 | 0 | 1 = piece.colour == 'white'? -1: 1;
  const captureLeft: Position = {row: pos.row + up, col: engine.moveColLeft(pos.col, 1)};
  const captureRight: Position = {row: pos.row + up, col: engine.moveColRight(pos.col, 1)};

  let ret: Move[] = [];
  let occPiece: Piece | null = null;

  //Check diagonal left of piece
  occPiece = engine.checkSquare(captureLeft, board);
  if (occPiece && (occPiece.colour != piece.colour)) {
    ret.push(generateCaptureMove(piece, pos, captureLeft, captureLeft, {row: up, col: -1}));
  }

  //Check diagonal right of piece
  occPiece = engine.checkSquare(captureRight, board);
  if (occPiece && (occPiece.colour != piece.colour)) {
    ret.push(generateCaptureMove(piece, pos, captureRight, captureRight, {row: up, col: 1}));
  }

  return ret;
}