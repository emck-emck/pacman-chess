import { Board } from '../../models/board';
import { Piece, PieceType, Colour } from '../../models/piece';
import { BOARDSIZE } from '../constants';

const backRank: PieceType[] = [
  'rook',
  'knight',
  'bishop',
  'queen',
  'king',
  'bishop',
  'knight',
  'rook',
];

const STARTROWS = {
  blackBack: 0,
  blackPawn: 1,
  whitePawn: BOARDSIZE - 2,
  whiteBack: BOARDSIZE - 1,
};

export function initBoard() {
  const board: Board = [];
  for (let y = 0; y < BOARDSIZE; y++) {
    const row: (Piece | null)[] = [];
    for (let x = 0; x < BOARDSIZE; x++) {
      row.push(null);
    }
    board.push(row);
  }

  setupPieces(board);

  return board;
}

function setupPieces(board: Board) {
  // Black back rank
  for (let col = 0; col < BOARDSIZE; col++) {
    board[STARTROWS.blackBack][col] = createPiece(backRank[col], 'black');
  }

  // Black pawns
  for (let col = 0; col < BOARDSIZE; col++) {
    board[STARTROWS.blackPawn][col] = createPiece('pawn', 'black');
  }

  // White pawns
  for (let col = 0; col < BOARDSIZE; col++) {
    board[STARTROWS.whitePawn][col] = createPiece('pawn', 'white');
  }

  // White back rank
  for (let col = 0; col < BOARDSIZE; col++) {
    board[STARTROWS.whiteBack][col] = createPiece(backRank[col], 'white');
  }
}

function createPiece(type: PieceType, colour: Colour): Piece {
  return {
    type,
    colour,
    hasMoved: false,
  };
}
