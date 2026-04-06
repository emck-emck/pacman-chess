import { Piece } from '../../../../models/piece';
import { Position } from '../../../../models/position';
import { Move } from '../../../../models/move';

import { generateEnPassantMove } from '../../moves-utils/moves-factory';
import { ChessEngine } from '../../../chess-engine';

export function getPawnEnPassant(
  engine: ChessEngine,
  piece: Piece,
  pos: Position,
  enPassantTarget: (Position | null)
): Move[] {
  let ret: Move[] = [];
  const up: -1 | 0 | 1 = piece.colour == 'white'? -1: 1;
  const enPassantRow: number = pos.row + up;
  const captureLeft: Position = {row: pos.row, col: engine.moveColLeft(pos.col, 1)};
  const captureRight: Position = {row: pos.row, col: engine.moveColRight(pos.col, 1)};

  // Bail if no en passant target
  if(!enPassantTarget) return ret;

  if(enPassantTarget.row === enPassantRow){
    // Check left
    if(enPassantTarget.col === captureLeft.col){
      ret.push(generateEnPassantMove(piece, pos, enPassantTarget, captureLeft, {row: up, col: -1}));
    }

    // Check right
    if(enPassantTarget.col === captureRight.col){
      ret.push(generateEnPassantMove(piece, pos, enPassantTarget, captureRight, {row: up, col: 1}));
    }
  }

  return ret;
}