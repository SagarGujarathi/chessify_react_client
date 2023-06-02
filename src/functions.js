// Constants imports

import { TYPES, NAMING, MOVES, CONSTANTS, COLOR } from "./constants"

// Function to check if present block has enemy or not
function canMove(color1, color2) {
    if (color1 == color2) {
        return false
    }
    return true
}

// Function to verify if the iteration is not out of boundary
function verifyBoundary({ i, j }) {
    if (i >= 0 && i < 8 && j >= 0 && j < 8) {
        return true
    }
    return false
}

// Function to change itermation index
function changeIndex({ i, j }, move) {
    return { i: i + move.i, j: j + move.j }
}

// function to check if path to move is possible
function isPossiblePath(element, color) {
    if (element.piece == NAMING.DEFAULT) {
        return { ...element, image: CONSTANTS.PATHIMAGE }
    }
    if (element.color != color && element.color != COLOR.DEFAULT) {
        return { ...element, backgroundColor: CONSTANTS.DANGERCOLOR }
    }
    return element
}

// Rook Assist Logic
function handleRookAssist(chess, { i, j }, piece, color, move) {
    if (!verifyBoundary({ i, j }) || (move != MOVES.DEFAULTMOVE && !canMove(chess[i][j].color, color))) {
        return chess
    }
    if (move == MOVES.DEFAULTMOVE) {
        handleRookAssist(chess, changeIndex({ i, j }, MOVES.TOP), piece, color, MOVES.TOP)
        handleRookAssist(chess, changeIndex({ i, j }, MOVES.BOTTOM), piece, color, MOVES.BOTTOM)
        handleRookAssist(chess, changeIndex({ i, j }, MOVES.LEFT), piece, color, MOVES.LEFT)
        handleRookAssist(chess, changeIndex({ i, j }, MOVES.RIGHT), piece, color, MOVES.RIGHT)
        return chess
    }
    chess[i][j] = isPossiblePath(chess[i][j], color)
    handleRookAssist(chess, changeIndex({ i, j }, move), piece, color, move)
}

// Pawn Assist Logic
function handlePawnAssist(chess, index, piece, color) {
    return chess
}

// Knight Assist Logic
function handleKnightAssist(chess, index, piece, color) {
    return chess
}

// Bishop Assist Logic
function handleBishopAssist(chess, index, piece, color) {
    return chess
}

// Queen Assist Logic
function handleQueenAssist(chess, index, piece, color) {
    return chess
}

// King  Assist Logic
function handleKingAssist(chess, index, piece, color) {
    return chess
}

// Function to handle Player Assist
function handleMoveAssist(chess, chance, { index, piece, color }) {
    switch (piece) {
        case NAMING.PAWN:
            return handlePawnAssist(chess, index, piece, color)
        case NAMING.ROOK:
            return handleRookAssist(chess, index, piece, color, MOVES.DEFAULTMOVE)
        case NAMING.KNIGHT:
            return handleKnightAssist(chess, index, piece, color)
        case NAMING.BISHOP:
            return handleBishopAssist(chess, index, piece, color)
        case NAMING.QUEEN:
            return handleQueenAssist(chess, index, piece, color)
        case NAMING.KING:
            return handleKingAssist(chess, index, piece, color)
        default:
            return chess
    }
}

// Function to verify if player choosen correct piece
function verifySelectPiece(chess, chance, { index, piece, color }) {
    if (chance === color) {
        return handleMoveAssist(chess, chance, { index, piece, color })
    }
    return false
}

// Reducer function
export function handleReducer(state, { type, payload }) {
    switch (type) {
        case TYPES.SELECTPIECE:
            const data = verifySelectPiece(state.chess, state.chance, payload)
            if (data != false) {
                return { ...state, selectedPiece: payload, chess: data }
            }
            return state
        case TYPES.SELECTMOVE:
            return { ...state, selectedMove: payload }
    }
}

