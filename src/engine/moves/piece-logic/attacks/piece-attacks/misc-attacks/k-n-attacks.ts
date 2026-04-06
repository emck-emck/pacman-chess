import { Piece } from '../../../../../../models/piece';
import { Position } from '../../../../../../models/position';
import { Board } from '../../../../../../models/board';
import { Move } from '../../../../../../models/move';
import { Direction } from '../../../../../../models/direction';

import { generateNormalMove, generateCaptureMove } from '../../../../moves-utils/moves-factory';

import { ChessEngine } from '../../../../../chess-engine';

export function getKNAttacks(
  engine: ChessEngine,
  piece: Piece,
  pos: Position,
  board: Board,
  directions: Position[]
): Move[] {

  let occPiece: Piece | null = null;
  let ret: Move[] = []

  for(const d of directions){
    let y: number;
    let x: number;
    let dirRow: -1 | 0 | 1;
    let dirCol: -1 | 0 | 1;

    if(d.row > 0){
      dirRow = 1;
    }else if(d.row < 0){
      dirRow = -1;
    }else{
      dirRow = 0;
    }
    y = pos.row + d.row;

    if(d.col > 0){
      dirCol = 1;
      x = engine.moveColRight(pos.col, d.col);
    }else if(d.col < 0){
      dirCol = -1;
      x = engine.moveColLeft(pos.col, -d.col);
    }else{
      dirCol = 0;
      x = pos.col;
    }

    const to: Position = {row: y, col: x};
    const dir: Direction = {row: dirRow, col: dirCol};

    //Check bounds
    if(!engine.isInBounds(to, board)) continue;

    //Check piece in way
    occPiece = engine.checkSquare(to, board);
    //If no piece in way
    if(!occPiece ){
      ret.push(generateNormalMove(piece, pos, to, dir));
    }else if(occPiece.colour != piece.colour){
      ret.push(generateCaptureMove(piece, pos, to, to, dir))
    }

  }
  return ret;
}
