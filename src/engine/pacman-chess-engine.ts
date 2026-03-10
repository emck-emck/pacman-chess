import { ChessEngine } from "./chess-engine";
import { BOARDSIZE } from "../constants";
import { Position } from "../models/position";
import { Board } from "../models/board";

export class PacmanChessEngine extends ChessEngine {
    constructor(){
        super();
    }

    override isInBounds(pos: Position, board: Board): boolean {
      return pos.row >= 0 && pos.row < board.length;
    }

    // MOVEBY MUST BE LESS THAN BOARDSIZE
    override moveColLeft(col: number, moveBy: number): number {
      return ((col + (BOARDSIZE - moveBy)) % BOARDSIZE)
    }
    
    override moveColRight(col: number, moveBy: number): number{
      return ((col + moveBy) % BOARDSIZE);
    }
}