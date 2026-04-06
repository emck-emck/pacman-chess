import { Move } from "../../../models/move";
import { Position } from "../../../models/position";
import { Piece, PieceType } from "../../../models/piece";
import { Direction } from "../../../models/direction";

export function generateNormalMove(piece: Piece, from: Position, to: Position, direction: Direction): Move{
    return {
        piece: piece,
        from: from,
        to: to,
        direction: direction,
        type: 'normal'
    };
}

export function generateCaptureMove(piece: Piece, from: Position, to: Position, capture: Position, direction: Direction): Move{
    return {
        piece: piece,
        from: from,
        to: to,
        direction: direction,
        capture: capture,
        type: 'capture'
    }
}

export function generateEnPassantMove(piece: Piece, from: Position, to: Position, capture: Position, direction: Direction): Move{
    return {
        piece: piece,
        from: from,
        to: to,
        direction: direction,
        capture: capture,
        type: 'en-passant'
    }
}

export function generateCastlingMove(piece: Piece, from: Position, to: Position, rFrom: Position, rTo:Position , direction: Direction): Move{
    return {
        piece: piece,
        from: from,
        to: to,
        direction: direction,
        type: 'castle',
        secondaryMoves: {
            from:rFrom,
            to: rTo
        }
    }
}

export function generatePromotionMove(piece: Piece, from: Position, to: Position, promoPiece: PieceType, direction: Direction, capture?: Position): Move{
    return {
        piece: piece,
        from: from,
        to: to,
        direction: direction,
        capture: capture,
        type: 'promotion',
        promotion: promoPiece
    };
}