import { Piece } from '../../../models/piece';
import { Position } from '../../../models/position';
import { Board } from '../../../models/board';
import { BOARDSIZE } from '../../constants';

import { checkSquare, moveColLeft, moveColRight } from '../../utils/moves-utils';

export function getPawnMoves(
  piece: Piece,
  pos: Position,
  board: Board
): Position[] {
  const up: number = piece.colour == 'white'? -1: 1;
  const moveUpOne: Position = {row: pos.row + up, col: pos.col};
  const moveUpTwo: Position = {row: pos.row + (up*2), col: pos.col};  
  const captureLeft: Position = {row: pos.row + up, col: moveColLeft(pos.col, 1)};
  const captureRight: Position = {row: pos.row + up, col: moveColRight(pos.col, 1)};

  let ret: Position[] = [];
  let occPiece: Piece | null = null;

  //PROMOTION LOGIC NEEDED

  // Check in front of piece
  occPiece = checkSquare(moveUpOne, board);
  if (!occPiece) {
    ret.push(moveUpOne);
  }

    //If first move for pawn and nobody is on the square in front
  if (!piece.hasMoved && !occPiece) {
    // Check two squares in front of piece
    occPiece = checkSquare(moveUpTwo, board);
    if (!occPiece) {
      ret.push(moveUpTwo);
    }
  }

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

  piece.hasMoved = true;

  return ret;
}
