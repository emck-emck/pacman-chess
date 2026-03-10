import { Piece } from '../../../../models/piece';
import { Position } from '../../../../models/position';
import { Board } from '../../../../models/board';
import { Move } from '../../../../models/move';

import { generateNormalMove } from '../../moves-utils/moves-factory';
import { ChessEngine } from '../../../chess-engine';

export function getPawnMoves(
  engine: ChessEngine,
  piece: Piece,
  pos: Position,
  board: Board
): Move[] {
  const up: number = piece.colour == 'white'? -1: 1;
  const moveUpOne: Position = {row: pos.row + up, col: pos.col};
  const moveUpTwo: Position = {row: pos.row + (up*2), col: pos.col}; 

  let ret: Move[] = [];
  let occPiece: Piece | null = null;

  // Check in front of piece
  occPiece = engine.checkSquare(moveUpOne, board);
  if (!occPiece) {
    ret.push(generateNormalMove(pos, moveUpOne));
  }

    //If first move for pawn and nobody is on the square in front
  if (!piece.hasMoved && !occPiece) {
    // Check two squares in front of piece
    occPiece = engine.checkSquare(moveUpTwo, board);
    if (!occPiece) {
      ret.push(generateNormalMove(pos, moveUpTwo));
    }
  }

  return ret;
}