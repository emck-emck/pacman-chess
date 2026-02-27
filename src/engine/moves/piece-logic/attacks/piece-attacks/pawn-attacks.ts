import { Piece } from '../../../../../models/piece';
import { Position } from '../../../../../models/position';
import { Board } from '../../../../../models/board';

import { checkSquare } from '../../../../utils/engine-utils';
import { moveColLeft, moveColRight } from '../../../moves-utils';

export function getPawnAttacks(
  piece: Piece,
  pos: Position,
  board: Board
): Position[] {
  const up: number = piece.colour == 'white'? -1: 1;
  const captureLeft: Position = {row: pos.row + up, col: moveColLeft(pos.col, 1)};
  const captureRight: Position = {row: pos.row + up, col: moveColRight(pos.col, 1)};

  let ret: Position[] = [];
  let occPiece: Piece | null = null;

  //Check diagonal left of piece
  occPiece = checkSquare(captureLeft, board);
  if (occPiece && (occPiece.colour != piece.colour)) {
    ret.push(captureLeft);
  }

  //Check diagonal right of piece
  occPiece = checkSquare(captureRight, board);
  if (occPiece && (occPiece.colour != piece.colour)) {
    ret.push(captureRight);
  }

  return ret;
}
