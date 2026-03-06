import { Piece } from '../../../../models/piece';
import { Position } from '../../../../models/position';
import { Move } from '../../../../models/move';

import { generateEnPassantMove } from '../../moves-utils/moves-factory';
import { moveColLeft, moveColRight } from '../../moves-utils/moves-utils';

export function getPawnEnPassant(
  piece: Piece,
  pos: Position,
  enPassantTarget: (Position | null)
): Move[] {
  let ret: Move[] = [];
  const up: number = piece.colour == 'white'? -1: 1;
  const enPassantRow: number = pos.row + up;
  const captureLeft: Position = {row: pos.row, col: moveColLeft(pos.col, 1)};
  const captureRight: Position = {row: pos.row, col: moveColRight(pos.col, 1)};

  // Bail if no en passant target
  if(!enPassantTarget) return ret;

  if(enPassantTarget.row === enPassantRow){
    // Check left
    if(enPassantTarget.col === captureLeft.col){
      ret.push(generateEnPassantMove(pos, enPassantTarget, captureLeft));
    }

    // Check right
    if(enPassantTarget.col === captureRight.col){
      ret.push(generateEnPassantMove(pos, enPassantTarget, captureRight));
    }
  }

  return ret;
}