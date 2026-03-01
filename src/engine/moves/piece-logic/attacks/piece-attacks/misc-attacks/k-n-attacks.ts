import { Piece } from '../../../../../../models/piece';
import { Position } from '../../../../../../models/position';
import { Board } from '../../../../../../models/board';
import { Move } from '../../../../../../models/move';
import { BOARDSIZE } from '../../../../../constants';

import { generateNormalMove, generateCaptureMove } from '../../../../moves-utils/moves-factory';

import { checkSquare } from '../../../../../utils/engine-utils';

export function getKNAttacks(
  piece: Piece,
  pos: Position,
  board: Board,
  moves: Position[]
): Move[] {

  let occPiece: Piece | null = null;
  let ret: Move[] = []

  for(const to of moves){
    //Check bounds
    if((to.row > (BOARDSIZE-1)) || to.row < 0) continue;

    //Check piece in way
    occPiece = checkSquare(to, board);
    //If no piece in way
    if(!occPiece ){
      ret.push(generateNormalMove(pos, to));
    }else if(occPiece.colour != piece.colour){
      ret.push(generateCaptureMove(pos, to, to))
    }

  }
  return ret;
}
