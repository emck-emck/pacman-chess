import { Piece } from '../../../../../models/piece';
import { Position } from '../../../../../models/position';
import { Board } from '../../../../../models/board';
import { Move } from '../../../../../models/move';

import { generateCaptureMove } from '../../../moves-utils/moves-factory';
import { moveColLeft, moveColRight } from '../../../moves-utils/moves-utils';

import { checkSquare } from '../../../../utils/engine-utils';

export function getPawnAttacks(
  piece: Piece,
  pos: Position,
  board: Board
): Move[] {
  const up: number = piece.colour == 'white'? -1: 1;
  const captureLeft: Position = {row: pos.row + up, col: moveColLeft(pos.col, 1)};
  const captureRight: Position = {row: pos.row + up, col: moveColRight(pos.col, 1)};

  let ret: Move[] = [];
  let occPiece: Piece | null = null;

  //Check diagonal left of piece
  occPiece = checkSquare(captureLeft, board);
  if (occPiece && (occPiece.colour != piece.colour)) {
    ret.push(generateCaptureMove(pos, captureLeft, captureLeft));
  }

  //Check diagonal right of piece
  occPiece = checkSquare(captureRight, board);
  if (occPiece && (occPiece.colour != piece.colour)) {
    ret.push(generateCaptureMove(pos, captureRight, captureRight));
  }

  return ret;
}