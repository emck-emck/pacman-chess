import { Move } from "../../../models/move";
import { Position } from "../../../models/position";

export function generateNormalMove(from: Position, to: Position): Move{
    return {
        from: from,
        to: to,
        type: 'normal'
    };
}

export function generateCaptureMove(from: Position, to: Position, capture: Position): Move{
    return {
        from: from,
        to: to,
        capture: capture,
        type: 'capture'
    }
}

export function generateEnPassantMove(from: Position, to: Position, capture: Position): Move{
    return {
        from: from,
        to: to,
        capture: capture,
        type: 'en-passant'
    }
}

export function generateCastlingMove(from: Position, to: Position): Move{
    return {
        from: from,
        to: to,
        type: 'castle'
    }
}