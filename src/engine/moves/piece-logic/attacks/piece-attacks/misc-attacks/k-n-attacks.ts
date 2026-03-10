import { Piece } from '../../../../../../models/piece';
import { Position } from '../../../../../../models/position';
import { Board } from '../../../../../../models/board';
import { Move } from '../../../../../../models/move';

import { generateNormalMove, generateCaptureMove } from '../../../../moves-utils/moves-factory';

import { ChessEngine } from '../../../../../chess-engine';

export function getKNAttacks(
  engine: ChessEngine,
  piece: Piece,
  pos: Position,
  board: Board,
  moves: Position[]
): Move[] {

  let occPiece: Piece | null = null;
  let ret: Move[] = []

  for(const to of moves){
    //Check bounds
    if(!engine.isInBounds(to, board)) continue;

    //Check piece in way
    occPiece = engine.checkSquare(to, board);
    //If no piece in way
    if(!occPiece ){
      ret.push(generateNormalMove(pos, to));
    }else if(occPiece.colour != piece.colour){
      ret.push(generateCaptureMove(pos, to, to))
    }

  }
  return ret;
}
